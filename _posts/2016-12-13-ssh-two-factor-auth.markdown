---
layout: post
title:  "SSH Two-Factor Auth (2FA)"
date:   2016-12-13 21:29:18 -0700
category: security
tags: security sysadmin ssh
comments: true
cta: Love security? Subscribe here for more!
---

In today's ever-expanding threat to our information systems, we need every defensive measure we can get. To employ a defense-in-depth strategy, it is beneficial to require a second authentication factor. This is usually performed by sending a random string via SMS, but this is no longer good enough. Attackers may coerce your mobile provider into handing over control of your number, granting them access to your codes. The preferred method is with a one time pad generated from the current time and random seed value. This is known as Time-based One Time Pad (TOTP). If you'd like to lock down your Linux box, 2FA is a great way to do so. Even with public key authentication (don't even consider password authentication on an-internet exposed machine).

{% include toc.markdown %}

## Set Up
First you'll need the software to generate authentication codes on your mobile device. You can use an app like the Google Authenticator to do so. This app allows you to use a QR code to import your seed value, making setup simple and quick. You can get the app for both [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) and [iOS](https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8). You could instead use Red Hat's [FreeOTP](https://play.google.com/store/apps/details?id=org.fedorahosted.freeotp).

To perform TOTP protected logins on the server, we must first install the PAM module. You can do this on Debian and Ubuntu systems by installing the package via apt.

```bash
$ sudo apt-get install libpam-google-authenticator
```
Next, you'll need to update the PAM configuration to require verification upon login. Edit /etc/pam/sshd, commenting out the common-auth password authentication and appending the following line:

```bash
# @include common-auth
auth required pam_google_authenticator.so nullok 
```

The nullok option marks this method as optional for users who have not yet configured 2FA. Once all of your users are configured, you can remove this to make it a strict requirement.

Next, open up your sshd configuration and update the following directives:

```bash
UsePAM yes
PasswordAuthentication no
ChallengeResponseAuthentication yes
AuthenticationMethods publickey,keyboard-interactive
```

With the PAM module and sshd configured, users can generate their seeds. Users can enable two factor authentication by executing this helper command:

```bash
$ google-authenticator
```

Now it will prompt you for a few settings. You will want to use time based auth tokens here to use it with the Authenticator app. Next, it renders a QR code to the terminal. Scan this code with your Authenticator app to import your seed value. Then it asks if you want to save your configuration (yes!), and whether to only allow one attempt per code. Depending on your threat model, you may want to enable this to help prevent man in the middle attacks. If you mistype the code, you'll have to wait until the next cycle.

Finally it asks if you want to compensate for clock skew issues, and if you want to perform rate limiting. It's more secure to use the shorter time window if you don't have clock issues. The rate limiting can be helpful if you're not already using fail2ban or denyhosts.

With the configuration changes in place, restart sshd and test a login!

```bash
$ ssh user@example.com
Authenticated with partial success.
Verification code:
```

## Recovery
In the event that you lose access to your device, use your recovery code to log in. You did put these in a safe place, right?! If for any reason you do not have access to your recovery codes, log in using the console and disable your verification codes. This can be done by renaming or removing the ~/.google_authenticator file. Then, you can either reconfigure the authenticator, or disable it if needed.

## Conclusion
Requiring a second factor to authenticate is well on its way to becoming the norm. Passwords have proven inadequate, usually due to poor choice of password. Biometric authentication is not good enough. What do you do when your fingerprint is compromised (like in the OPM hack)? It can't be so easily changed. What stops a malicious attacker from cutting that finger off and using your print?! Fingerprint readers have also been fooled with fake fingers reconstructed from lifted prints. Best to avoid that whole can of worms. Passwords are best used when complex, random, and stored in an encrypted database (i.e. in a password manager). With this added requirement of 2FA, an attacker would not only have to pwn your box to lift your passphrases, but they'd also need access to your phone.

Now you can sleep a bit more soundly! Keep on the lookout for more ways to lock down your boxes. Subscribe below to get notifications by email as new guides are released. Have any questions? Feel free to leave them in the comments or send me a message!

## Additional References
* [https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm](https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm)
* [https://www.digitalocean.com/community/tutorials/how-to-set-up-multi-factor-authentication-for-ssh-on-ubuntu-14-04](https://www.digitalocean.com/community/tutorials/how-to-set-up-multi-factor-authentication-for-ssh-on-ubuntu-14-04)
* [https://wiki.archlinux.org/index.php/Google_Authenticator](https://wiki.archlinux.org/index.php/Google_Authenticator)
