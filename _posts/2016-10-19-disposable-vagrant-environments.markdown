---
layout: post
title:  "Disposable, Reproducible Environments with Vagrant"
date:   2016-10-19 7:39:42 -0700
category: devops
tags: vagrant devops
comments: true
published: true
---

Even if you haven't used Vagrant, I'm sure you've still heard about it. Vagrant is one of the most popular Hashicorp products. It provides an abstraction over virtualization software, using VirtualBox by default. Vagrant creates your development machines by cloning base boxes. You can download these from the public repository or import one from a local file. You can also package and publish your own base boxes. Vagrant can provision your boxes, either on first boot or on demand.  I love this tool, and use it with Puppet for a ton of my development, I can't recommend it enough.

## Installation
Many distros have an outdated version in their repos, so it is best to download the latest version. Download the appropriate package for your operating system on the [Vagrant downloads](https://www.vagrantup.com/downloads.html) page. Be sure to verify the checksums and their GPG signature!

```bash
wget https://releases.hashicorp.com/vagrant/1.8.6/vagrant_1.8.6_x86_64.deb
wget https://releases.hashicorp.com/vagrant/1.8.6/vagrant_1.8.6_SHA256SUMS
wget https://releases.hashicorp.com/vagrant/1.8.6/vagrant_1.8.6_SHA256SUMS.sig
gpg -v vagrant_1.8.6_SHA256SUMS.sig
shasum vagrant_1.8.6_x86_64.deb && grep x86_64.deb vagrant_1.8.6_SHA256SUMS
sudo dpkg -i vagrant_1.8.6_x86_64.deb
```

Then verify your installation by running `vagrant help`.

## Creating Your First Vagrant Environment
Once you have Vagrant installed, you are ready to create your first Vagrant environment. Navigate to the directory you want to store your environments and execute `vagrant init`. You can also specify the box you'd like to use as an argument.

```bash
vagrant init debian/jessie64
vagrant up
```

When you first execute `vagrant up`, it checks your local box repo and will fetch the box it isn't present. You can update the box when a new version is released by running `vagrant box update`.

Once your vm is up, you can log in by executing `vagrant ssh`. If you are managing multiple vms in your Vagrant environment, you will need to specify the vm name as an argument. Another handy feature is the ssh-config subcommand, which renders an ssh config snippet to access your vm:

```bash
vagrant ssh-config
Host mybox
  HostName 127.0.0.1
  User vagrant
  Port 2222
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile /home/user/dev/.vagrant/machines/mybox/virtualbox/private_key
  IdentitiesOnly yes
  LogLevel FATAL

vagrant ssh-config >> ~/.ssh/config
ssh mybox
scp some.file mybox:/tmp/
```

Vagrant also includes directives for controlling port forwarding and other networking options. Before, we would need to use the Virtual Box GUI or command line to set the IP address or use a bridged adapter. Now, with Vagrant, we can just include the appropriate config in your Vagrantfile. For example, if we needed to forward a port to memcached, we would add the following lines:

```ruby
config.vm.network "forwarded_port", guest: 11211, host: 11211
```

Vagrant will handle forwarding SSH by default. You can also include an `:auto_correct` option, which will instruct Vagrant to try new ports if the specified port is already in use.

## Using Provisioners
A "provisioner" is a bootstrapping script executed on the Vagrant machine. By default, it executes them when the vm is first created, but you can also execute them on command. Vagrant supports a handful of provisioners, including shell scripts, Puppet, and Chef. This is probably my favorite feature! Provisioners allow you to go from a base vm to your desired configuration in no time. This is great for sharing dev environments or building replicas of your production architecture. It's also perfect for developing your configuration management scripts.

Let's begin by getting familiar with the shell provisioner, the most straightforward. This one just copies your shell script onto the vm, then executes it when appropriate. This makes it perfect for installing some base packages or tweaking a system config. For example, if we wanted to roll out the LAMP stack on an Ubuntu Trusty vm, we would use a shell provisioner as follows:

```ruby
config.vm.box = 'ubuntu/trusty64'
config.vm.network "forwarded_port", guest: 80, host: 8080

config.vm.provision :shell do |sh|
  export DEBIAN_FRONTEND=noninteractive
  apt update
  apt upgrade
  apt install -y apache2 mysql-server php5 php5-mysql
end
```

Once you have your Vagrantfile in place, execute `vagrant up`. After it clones your vm, you'll see apt performing the package updates. When it's finished, point your web browser at localhost:8080 where you should see your web server running!

## Plugins
Once you've gotten more familiar with Vagrant, you'll want to extend it with plugins! There are all kinds of new things you can do with Vagrant plugins. Usually this is adding support for more virtualization technologies. In Vagrant terminology these are the "providers." For rapid development with lightweight environments, you can switch to Docker or LXC. Using containers with Vagrant is great, enabling fast boot times and low resource footprints. If you want to use LXC, you'll need to install the plugin, but Docker support is now included by default. Windows users may opt to buy the VMware plugin to use their proprietary hypervisor. Alternatively, the libvirt plugin enables a whole ecosystem of open source *nix virtualization. This includes qemu, KVM, and Xen. For the cloud, there are plugins for creating boxes on AWS, Google Compute, Digital Ocean, and Linode.

To install a new plugin, just run:

```bash
vagrant plugin install vagrant-libvirt
```

When using Vagrant on the command line with multiple providers, you may need to manually specify the provider. It is also helpful to set a default provider in your bashrc.

```bash
vagrant up --provider=vmware_fusion
export VAGRANT_DEFAULT_PROVIDER=vmware_fusion
```

## Conclusion
Finally, when you're finished developing and have committed your work, you can throw away the vm:

```bash
vagrant destroy -f
```

This removes the cloned and provisioned vm, leaving your base box preserved. This saves a bunch of space, especially when you're working with a number of different environments. If you only want to shutdown the vm temporarily, you can instead use:

```bash
vagrant halt
```

This was just the tip of the iceberg when it comes to Vagrant! The real power comes in the development workflows that this tool enables. Vagrant empowers teams with rapid development, ensuring everyone is working with the same environment. No more worrying about operating system or language version incompatibilities! Your developers can write their code in a box just like your production machines. I hope this will spark your creativity to begin constructing some new environments. If you have any questions or would like to learn more about Vagrant and DevOps practices, leave a comment and subscribe to the newsletter below!
