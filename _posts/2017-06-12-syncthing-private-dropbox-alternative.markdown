---
layout: post
title:  "Syncthing: Private Dropbox Alternative"
date:   2017-06-12 17:48:11 -0700
category: productivity
tags: opensource productivity
comments: true
cta: Love the power of open source? Get guides for the coolest new tooling sent straight to your inbox!
---

In light of past events, some Dropbox users are questioning whether it's worth it to trust them with any of their data. If Condoleezza Rice being on board wasn't a big enough hit to privacy, a 2012 data breach finally surfaced, promoting many users to reset their passwords. Then, some users reported Dropbox on OS X using a password prompt similar to that in the OS to reconfigure. Needless to say, if you placed any trust in Dropbox before, it may be time to reconsider. This doesn't only apply to Dropbox though: you can switch from ANY hosted cloud provider to Syncthing!

## What is Syncthing?
[Syncthing](https://syncthing.net/) is a file synchronization tool which duplicates your files across all of your configured machines. Similar in concept to btsync, Syncthing keeps your files in sync by propagating the changes you make to the other nodes. All data passed between nodes is encrypted in transit. Unlike Dropbox and other file sync tools, Syncthing is peer to peer and is not dependant on a central service. You can however use a central server to dynamically connect your nodes. If you'd prefer to disable this, you can configure static addresses for your Syncthing nodes using their hostname or IP address. Local discovery is available as well for traffic between the nodes within your LAN, and functions through use of a broadcast. You can also use other Syncthing peers as relays. Since all of the data passed us encrypted, the third party relays cannot intercept any of your content.

## Comparison with Dropbox
Syncthing's list of features will be very familiar to users already on Dropbox. Both are written in Go, allow you to sync specific folders, and perform revision control. Additionally, both detect renaming and moving files, avoiding needlessly transferring data. A few key differences are listed in the table below:

|               | Dropbox                                  | Syncthing                                             |
| ------------- | -------------------------------------    | ------------------------------------------------      |
| Price         | Free-$50/mo                              | Free                                                  |
| License.      | Proprietary                              | open source (MPL v2)                                  |
| OS            | Win/OS X/Linux/Android/iPhone/Blackberry | Win/OS X/Linux/Solaris/Android                        |
| Architecture  | Centralized                              | Decentralized/P2P, with optional centralized features |


## Installation
On Windows and OS X, you'll want to download and execute the installer from the Syncthing site. On Android devices, the app can be downloaded from the [Google Play](https://play.google.com/store/apps/details?id=com.nutomic.syncthingandroid) store.

Finally, on Linux, you can compile from source, or use apt on Debian or Ubuntu. This is preferable so you'll be able to update Syncthing with the rest of your system packages. First, install their release PGP key and add their repo information to apt. Then update your package lists and install the syncthing package. It's also a good idea to install the syncthing-inotify package to more efficiently watch the sync directories for file changes.

```bash
curl -s https://syncthing.net/release-key.txt | sudo apt-key add -
echo "deb http://apt.syncthing.net/ syncthing release" | sudo tee /etc/apt/sources.list.d/syncthing.list
sudo apt-get update
sudo apt-get install syncthing syncthing-inotify
```

## Using Syncthing
Once Syncthing is installed, you can launch it by executing `syncthing` or `syncthing.exe`. Then open you web browser and navigate to http://localhost:8384. The web interface features controls for managing your connected devices, your different shared directories, and settings like your host name.

On Linux, depending on how you like to start your applications you might want to add the command to your window manager autorun, or write an init script or systemd service definition.

To connect your mobile device to your laptop, desktop, or server, bring up the system ID QR code. Next, on your mobile device, add a new connection, then scan the QR code. To add your mobile device to your laptop, you'll need to copy your device ID over. Copy it from the Syncthing interface and move it to your laptop in the method of your choosing, or just type it in. Syncthing is designed for it to be safe to share IDs. Mutual authentication is required for connectivity. You'll want to ensure the name of your share matches on both of your devices.

Once your devices are connected, copy a test file into your sync directory. Wait for Syncthing to propagate the changes, then examine the file on your other device. The content should match that of your source file. From the user's perspective, it functions in the same manner as other file sync solutions.

## Bonus Points: Connect Over Tor
To hide your location and connection metadata, Syncthing can be configured to connect over Tor. The mobile app also features controls for connecting with Orbot. If you've somehow escaped hearing of Tor in the past few years, [Tor](https://www.torproject.org) is a proxy network that works by onion routing. It utilizes multiple hops in a chain, each layer independently encrypted. The connection is finally unwrapped at the exit node, where it is passed on to your destination. It's a great proxy solution built on years of academic research and military funding. I highly recommend checking it out, it has a lot of neat features.

To route your Syncthing traffic over Tor on a Linux system, you'll want to update your startup command to be prefixed with `torsocks`. This is also a good opportunity to restrict the process to a firejail.

On Android, running Syncthing over Tor is as easy as installing Orbot and making the checkbox in the Syncthing settings!

## Conclusion
So as we have learned, there is a viable alternative to Dropbox! With Syncthing, you can reclaim ownership of your data. Your bits are stored on your servers, as many as you need to meet your redundancy requirements. You can still leverage the bandwidth of other peers in the system, without disclosing your private data. If you have opted to run Syncthing over Tor, you'll have added benefit of hiding your connection metadata from both your ISP and central services like Dropbox.

Remember, a file sync is NOT a backup!!! Offsite cold storage is preferable for that, as it won't be touched when you accidentally `rm -rf` your box at 4am. Let me know your experiences switching to Syncthing in the comments below and subscribe to the mailing list to stay in the loop!

## Additional References
* [syncthing.net/](https://syncthing.net/)
* [github.com/syncthing/syncthing](https://github.com/syncthing/syncthing)
* [docs.syncthing.net/users/security.html](https://docs.syncthing.net/users/security.html)
