---
layout: post
title:  "Encrypted File Containers with Tomb "
date:   2017-11-04 12:39:25 -0701
category: security
tags: security crypto
comments: true
published: true
---

With the demise of TrueCrypt, many were in search of a viable replacement. Fortunately, those in a Linux environment still had dm-crypt and LUKS. While you can create encrypted file containers using dm-crypt, it takes a few more steps than just clicking "mount" in your list of containers. Writing your own wrapper for `cryptsetup` is fun, but at times you may want to leverage something with a bit more power out of the box. Tomb is a wonderful command line interface to manage your encrypted file containers. Besides creating, mounting, and unmounting containers, it features powerful functionality like:

* Hooks to automatically mount directories and execute scripts
* Steganography with steghide to hide your keys in images
* Use of Key Derivation Functions to combat dictionary attacks
* Support for exporting your key as a QR code for cold storage

Someone even wrote a GUI if you like using those. :D

Even if you're using Full Disk Encryption, you can benefit from using encrypted file containers. This is best for a thorough Defense in Depth strategy, requiring multiple (different) keys to get to the innermost data. For strong operational security, it is recommended to separate each of your containers and keys according to concern. Encrypted containers are also well suited for storing on untrusted systems, such as questionable cloud providers or online storage solutions like Dropbox. As long as you handle your sensitive data on your local, trusted machine, the provider will only ever see random binary blobs. We'll explore some of our options below after getting acquainted with Tomb. Let's get started!

{% include toc.markdown %}

## Installation 
First you'll need to install the prerequisites, namely zsh. For some extra goodies, you'll also want some other packages, like `dcfldd` (to see progress when generating tombs and keys), `haveged` (for stirring the system's entropy pool), `steghide` (for "burying" and "exhuming" keys from images), `qrencode` (for "engraving" a QR code of your key), and `libgcrypt-dev` (for using key derivation functions). On Debian and Ubuntu this is as easy as:

```bash
sudo apt-get install zsh dcfldd haveged steghide qrencode libgcrypt-dev wipe
```

Next, download the tomb archive from [dyne.org](https://files.dyne.org/tomb/), retrieve Jaromil's key from the MIT keyservers or from [Keybase](https://keybase.io/jaromil), and verify the PGP signature: 

```bash
gpg --recv-keys 0x73B35DA54ACB7D10 --keyserver pgp.mit.edu
wget https://files.dyne.org/tomb/Tomb-2.4.tar.gz{,.asc}
gpg -v Tomb-2.4.tar.gz.asc
```

You should get a "Good signature..." in the output if the file hasn't been tampered or corrupted:

```bash
# ...
gpg: Good signature from "Denis Roio (Jaromil) <jaromil@dyne.org>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 6113 D89C A825 C5CE DD02  C872 73B3 5DA5 4ACB 7D10
gpg: binary signature, digest algorithm SHA256
```

Good, now we can actually install it!

```bash
tar -zxf Tomb-2.4.tar.gz
cd Tomb-2.4
sudo make install
cd extras

# If you want the Zenity gui:
sudo install -Dm755 gtomb/gtomb /usr/local/bin/gtomb

# For using key derivation functions
cd kdf-keys
make
sudo make install
```

## Creating a New Container
Before you can store any files, you need to create a new container, and a corresponding keyfile to lock the container. 

```bash
# First dig your new tomb, in this example 256MB
tomb dig -s 256 documents.tomb

# Next, create the key with it's associated password
tomb forge documents.tomb.key
tomb forge --kdf 128 documents.tomb.key  # to use KDF, adjust for system's cpu
tomb lock documents.tomb -k documents.tomb.key
```

When you need to mount your tomb, execute:

```bash
tomb open documents.tomb -k documents.tomb.key

# You can also specify mount options with -o
tomb open documents.tomb -k documents.tomb.key -o ro
```

You can list your open tombs using:

```bash
tomb list
```

When you need to close your tomb, you can use:

```bash
tomb close documents
tomb slam  # alias for "tomb close all"
```

If you need to change the password of your keyfile, use:

```bash
tomb passwd -k documents.tomb.key
```

Then, when you need to rotate keys, generate a new key and issue the "setkey" subcommand:

```bash
tomb forge documents.tomb.new_key
tomb setkey documents.tomb.key documents.tomb -k documents.tomb.new_key

# Verify you can open the tomb with the new key
tomb open documents.tomb -k documents.tomb.new_key
tomb close documents

# Then replace the old key, or wipe it on magnetic disks
shred -uvzn 3 documents.tomb.key  # optional
mv documents.tomb.new_key documents.tomb.key
```

## Burying your Keys
With the steghide package installed, you can use [steganography](https://en.wikipedia.org/wiki/Steganography) to hide your key in a jpeg. Note that this is not compatible with the KDF method, as this would invalidate the benefits of multiple rounds.

> **Warning:** If you were already using a keyfile with KDF, you'll want to first rotate keys to one without KDF to avoid losing access to your tomb when you exhume your key!

```bash
# First bury your key in an image
tomb bury -k documents.tomb.key Pictures/lolcats.jpg
rm documents.tomb.key

# When you need to open your tomb, exhume the key
tomb exhume -k documents.tomb.key Pictures/lolcats.jpg
tomb open -k documents.tomb.key documents.tomb

# You can also open a tomb with the jpeg directly, unfortunately this doesn't
# work through STDIN though
tomb open -k lolcats.jpg Pictures/lolcats.jpg
```

Finally, to prepare a cold storage backup of your key, you can export it to a QR code and print it out. Store this in a safe, book, or safety deposit box until needed in a recovery situation. Set a reminder on your calendar to rotate your cold storage keys in another 6 or 12 months, adjusted to your liking. Note that this does export your key while still under protection of your passphrase.

```bash
tomb engrave -k documents.tomb.key
```

## Automatically Mount Directories with Bind Hooks
Bind hooks allow you to specify a mapping of folders on your container to a mount point on your file system. They will be automatically mounted to the target location in your homedir when you open your tomb. Examples of good candidates are your email cache, gpg/ssh keys, or Documents. Create a file called `bind-hooks` with a mapping of tomb directories to directories in your homedir :

```bash
documents Documents
gpg .gnupg
ssh .ssh
thunderbird .thunderbird
mozilla .mozilla
```

Then, when you mount your tomb, each of these directories will automatically become available. In this example, we're mounting the metadata directories for Thunderbird and Firefox, as well as our user's Documents folder and the SSH/GPG keys.

## Automatically Run Commands with Post Hooks
Similarly to bind hooks, post hooks allow you to take action after your container is opened or before it is closed. In this case, we can instead execute an arbitrary shell script. The possibilities are literally endless. To begin, create your `post-hooks` file. Continuing with the bind hooks example:

```sh
# !/bin/sh

OPERATION="$1"
MNT="$2"

if [ "$OPERATION" = "open" ]; then
    eval `ssh-agent -s`
    eval `gpg-agent --daemon`
    thunderbird &
    ssh-add
elif [ "$OPERATION" = "close" ]; then
    ssh-add -D
    ssh-agent -k
    gpg-agent -k
    pkill thunderbird
fi
```

This example script would let us automatically fire up ssh-agent and gpg-agent, add our ssh keys, and start Thunderbird once the tomb was mounted. Then, when we close the tomb, we'll automatically ensure Thunderbird is stopped, the ssh keys are removed from the keyring, and the agents are stopped. Two arguments are passed into the script: the operation, either "open" or "close", and the tomb's mountpoint. This allows us to perform different actions for setup and teardown.

## Storing Tombs in the Cloud
There are a few different approaches to using cloud providers with tomb. Most importantly, the container and the key material **should not** be kept in the same place. We can choose to store either the container or the keys on a remote host, according to preference. For example, you might choose to store your keys on your locked-down OpenBSD box, whole keeping your tomb on your Linux laptop.

If you opt to take this route and store your keys remotely, then you can `cat` your key over SSH and pipe it into STDIN for tomb:

```bash
ssh user@example.com 'cat .secrets/vault.tomb.key ' | tomb open -k - vault.tomb
```

On the other hand, you might prefer to keep your keys local and open a remote tomb. The best way to do this and keep all your secrets local is by using SSHFS. By doing so, you can remove trust from the remote host, as all it will ever see are blocks of encrypted data.

```bash
sshfs example.com:tombs tombs
tomb open -k vault.tomb.key tombs/vault.tomb
```

This example will mount the remote "tombs" directory into a local directory of the same name. Then, the local key will be used to open the tomb located in the mount point for the remote SSHFS directory. At no point did the remote host have access to the key or the decrypted data. Only the blocks that actually change are transferred, saving more bandwidth than some other remote storage solutions.

## Conclusion
As we have learned, Tomb provides a wide array of functionality to manage encrypted file containers. This convenient interface allows us to quickly integrate an additionally layer of encryption into our daily workflow. This is useful not only for securely storing sensitive documents, but also protecting configuration and metadata in your home directory. The power of bind and post hooks avoid repetitive actions after mounting your tomb, greatly streamlining your daily setup.

Here's a quick cheat sheet of common Tomb operations:

| Operation                    | Example                                                  |
| ---------------------------- | -------------------------------------------------------- |
| Create a tomb                | tomb dig -s 128 name.tomb                                |
| Create a keyfile             | tomb forge name.tomb.key                                 |
|                              | tomb forge --kdf 128 name.tomb.key (to use KDF)          |
| Lock a tomb with a key       | tomb lock -k name.tomb.key name.tomb                     |
| Open a locked tomb           | tomb open -k name.tomb.key name.tomb                     |
| List open tombs              | tomb list                                                |
| Close a specific tomb        | tomb close name                                          |
| Close all tombs              | tomb close all                                           |
|                              | tomb slam                                                |
| Bury a key in a jpg          | tomb bury -k name.tomb.key image.jpg                     |
| Exhume a key from a jpg      | tomb exhume -k name.tomb.key image.jpg                   |
| Change the password of a key | tomb passwd -k name.tomb.key                             |
| Change the key to a tomb     | tomb setkey -k name.tomb.new_key name.tomb.key name.tomb |
| Export the key to a QR code  | tomb engrave -k name.tomb.key                            |

I hope you've enjoyed learning about this versatile crypto tool! Tomb is a powerful and easy to use option for keeping multiple encrypted containers, wrapping the tried and true dm-crypt. What kind of directories or scripts do you like to use for bind and post hooks? Leave a comment below, and let me know if you have any other questions. Don't forget to subscribe to the newsletter for more useful content and updates on the latest tooling, and thanks for reading!

## Additional References
* tomb(1)
* [Tomb website](https://www.dyne.org/software/tomb/)
* [GitHub](https://github.com/dyne/Tomb)
