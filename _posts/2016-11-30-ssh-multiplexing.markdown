---
layout: post
title:  "SSH Multiplexing"
date:   2016-11-30 19:59:23 -0700
category: sysadmin
tags: ssh sysadmin
comments: true
cta: Was this tip helpful for your remote server workflow? Subscribe below to get more neat tricks like this delivered straight to your inbox!
---

SSH multiplexing is the ability to combine multiple SSH sessions over one TCP connection. Instead of opening a new TCP stream for each new SSH connection, it uses the existing socket. Then, each session after that passes over the socket instead of opening a new connection. This is not only faster, but reduces the number of open TCP streams from your host!

## Use Cases
SSH multiplexing can save both time and connection overhead. After opening your first session, it creates a socket to pass subsequent connections. This is great if you regularly open multiple terminal sessions to your server. Similarly, when using SSHFS, you'll mount your remote directories much more quickly. If you're using a bastion host, this will help when connecting to the hosts in your private subnet. It's also convenient when using SSH two factor authentication. On your initial connection you're required to enter the confirmation code. Any operations afterwards are already authenticated, such as an `scp`. In combination with a bastion host the benefits are even greater. SSH tunnels will also pass over this existing socket. X11 and ssh-agent forwarding also work with multiplexing, with one caveat: the forwarded agent will be the first one used. It cannot be overwritten in following connections.

## Set Up
To configure SSH multiplexing, open up your ~/.ssh/config and update the desired host definition.

```
Host example.com
    ControlPath ~/.ssh/%r@%h:%p.socket
    ControlMaster auto
    ControlPersist 10m
```

Upon establishing a connection to your server, it uses the socket will if it is active. Otherwise, it initiates the connection normally, and it creates the socket. The ControlMaster auto directive induces this behavior. Instead, you could specify the argument 'yes' at first to create the socket. Then, specify 'no' (the default) to use that socket. However, using 'auto' is much more flexible.

This ControlPath specification names the file according to the remote user, host, and port. In this example, it uses the file admin@example.com:22.socket for the user admin. Finally, ControlPersist instructs SSH to leave the socket open for ten minutes of inactivity.

If you'll be using multiplexing with a bastion host, be sure to test your configuration first. Leave another SSH or console session open and test a new connection. There are reports of compatibility issues with older versions of OpenSSH. In particular, the ControlMaster and ProxyCommand directives, so it's better safe than sorry.

## Conclusion
With these few tweaks to your configuration, you'll enjoy the improved responsiveness in your SSH workflow. Not only does this reduce waiting time, it will also save you valuable overhead when you're on a poor WAN link. OpenSSH truly is the sysadmin's Swiss army knife, versatile for any networking situation. Subscribe to my mailing list and connect with me on Twitter to stay to date! Need more SSH and Linux security tips? Please leave any questions you have in the comments below!

## Additional References
* [Using SSH Multiplexing](http://blog.scottlowe.org/2015/12/11/using-ssh-multiplexing/)
* [ssh_config(5)](https://linux.die.net/man/5/ssh_config)
