---
layout: post
title:  "Using an SSH Bastion Host"
date:   2016-05-31 15:16:23 -0700
category: security
tags: security
comments: true
---

A **bastion host**, also known as a **jumpbox**, is a machine whose sole purpose is to provide a secure entryway to your private network. This allows you to restrict network access to your internal services to only the bastion host, rejecting or dropping packets which do not originate from the bastion host. Not only does this allow you to reduce your visible attack surface, it also allows you to better allocate resources to securing your network, as you can put more effort into securing or auditing the jumpbox. This machine acts as a choke point, maintaining record of internal network access and providing a single machine to revoke access from in the event of compromise. Now you can go crazy with all the security tools and techniques you like without dealing with as large of a hassle! Set a non-standard SSH port, lock down that port with fwknop, use a OTP with Google authenticator, and more!


First, create a new machine in your datacenter who has access to the internal network you'd like to secure and configure SSH as you like. Just a few suggestions for your /etc/ssh/sshd_config:


* Ensure that protocol version 1 is disabled with the `Protocol 2` directive.
* Disable root login or require public key authentication with `PermitRootLogin no` or `PermitRootLogin without-password`.
* Whitelist the UNIX users or groups who are permitted to login via SSH with  the `AllowUsers`or `AllowGroups` directives.
* Listen for connections on a non standard port with `Port 22222`.


Then restart the SSH daemon. Be sure to leave your current session open and test connectivity in a new shell to verify you're not locked out.


Next you'll want to begin defining your hosts in your SSH client configuration for your user at ~/.ssh/config. For example, to configure access to the hosts www1 and db1 through the jumpbox, one would update their config as follows:

```
Host jumpbox
    Port 22222

Host www1
    ProxyCommand ssh jumpbox -w %h:%p

Host db1
    ProxyCommand ssh jumpbox -w %h:%p
```

This is also a great time to configure any convenience features provided by SSH, such as forwarding your SSH agent or specifying a separate SSH key for your jumpbox. Now verify connectivity through the bastion host by connecting with the server's alias that was defined above and running `who` to verify your source IP matches the bastion host.

```bash
user@local:~$ ssh www1
user@www1:~$ who -a
user   + pts/0        2016-05-31 13:10   .         9983 (10.0.2.58)
```

Once you've tested connectivity to all of your internal hosts and are satisfied with the results, you can begin to update your firewall and network configuration to restrict access to SSH (and any other desired services) to packets originating from the jumpbox. Depending on your environment, this may involve updating your AWS VPC security groups, updating your host iptables configuration, configuring your /etc/hosts.allow and /etc/hosts.deny if using inetd, or some combination thereof.

Finally, verify connectivity again (just to be sure). In case of emergency, you will need to access the machine using another channel, either locally or by serial. Depending on your cloud provider, some route the serial console to the web interface, providing a convenient interface for these situations. 
