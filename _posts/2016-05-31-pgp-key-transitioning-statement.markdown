---
layout: post
title:  "PGP Key Transitioning Statement"
date:   2016-05-31 4:12:00 -0700
category: security
tags: security pgp
comments: true
skip_readingtime: true
---

I am transitioning GPG keys from my previous 2048-bit RSA key to a new
4096-bit RSA key.  I prefer all new correspondance to be encrypted in the new
key, and will be making all signatures going forward with the new key. The transition document included below is signed with both keys to validate the
transition.

The old key, which I am transitioning away from, is:

```
pub   2048R/0xF4610DED826B9119 2013-03-31 [expires: 2016-08-23]
      Key fingerprint = 935C EFAB 782A 5EAB 45A2  67F6 F461 0DED 826B 9119
```

The new key, to which I am transitioning, is:

```
pub   4096R/0x2275D8A48C8E6314 2016-04-06 [expires: 2018-04-06]
      Key fingerprint = 9EDE B3B1 20E5 2D46 1C7C  5811 2275 D8A4 8C8E 6314
```

You can fetch the full new key from the SKS keyservers pool using GnuPG by running:

```
gpg --keyserver hkps://hkps.pool.sks-keyservers.net --recv-key 2275D8A48C8E6314 
```

Note: You'll need to have the `gnupg-curl` package installed to fetch keys over HKPS on Debian.

Below is the signed statement, which you can download [here]({% asset_path transition-stmt.txt.asc %}):

```
{% asset transition-stmt.txt.asc %}
```
