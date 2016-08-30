---
layout: post
title:  "Modifying Existing Resources in Terraform"
date:   2016-08-27 18:49:48 -0701
category: terraform
tags: terraform devops
comments: true
published: true
---


The crew over at [Hashicorp](https://www.hashicorp.com/) recently pushed out the latest revision of Terraform, v0.7! It features a bunch of excellent features I've been hanging on for and can't wait to play around with.

### The Import Command
In earlier releases, some features that felt missing were those relating handling existing infrastructure. If you had already created resources without Terraform, it would not track it in your state file. Terraform needs this to manage your resources! To control these resources with Terraform, one would need to destroy and recreate it. For an existing production infrastructure, this may be an unacceptable level of downtime. Enter the "import" command:

```bash
terraform import aws_instance.www1 i-aabbccdd
```

The above will instruct Terraform to refresh it's information about the specified resource. In this example, it will load into the state file an aws_instance "www1" with the details from EC2 instance i-aabbccdd.  You can then add the appropriate resource declaration your manifests. This allows you to begin managing that resource without ignoring or destroying it. 

### Safely Modifying Your State File
ometimes you may find yourself in a position where you need to modify the state file. If you must perform this dangerous operation, be sure to take a backup of your state file. Now we can use the "state" subcommand, a nice CLI wrapper for common state operations. This decreases the chances of the state file becoming corrupt due to something like a formatting error.

As an example, assume that we have existing resources as described by the following Terraform manifest:

```
resource "digitalocean_droplet" "www" {
    image = "ubuntu-14-04-x64"
    name = "www"
    region = "sfo1"
    size = "512mb"
}
```

Now say we wanted to refactor our manifest, encapsulating the droplet within a module. After doing so, if we were to execute `terraform plan`, we would see Terraform intends to destroy the droplet! This is due to the type change, if executed it would recreate it as a module. This is not what we intended, good thing we always check the Terraform plan before applying! ;)

To fix this, we can leverage the "state" subcommand. We'll update the droplet in the state file, replacing it's droplet type with the new module:

```
$ terraform state list
$ terraform state mv digitalocean_droplet.www module.www
```

Ensure your manifest matches the new resource type and name, then recheck your plan. If all looks well, `terraform apply`! 

### Related Information
Check out the official Terraform 0.7 announcement to check out the other new features. They just introduced list and map types, too! Keep on the lookout for an upcoming post on getting started with Terraform. The post will include usage and examples, great for new users to get up and running!

* [Terraform 0.7 Release Announcement](https://www.hashicorp.com/blog/terraform-0-7.html)
