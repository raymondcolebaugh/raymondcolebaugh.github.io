---
layout: page
title: Privacy Policy
permalink: /privacy-policy/
---

The analytics software I use are self-hosted, free, and open source to best preserve privacy ([Piwik](https://www.piwik.org/) and [X2CRM](https://www.x2crm.com/)). This software is also configured to respect the Do Not Track header configurable in your browser, so to opt out you only need to [configure that setting](http://donottrack.us/)! Note that the Do Not Track header requires the provider to respect the setting, so while my site won't track you, others might. 

The best way to opt-in while preserving privacy is by "allowing" the site with [uBlock Origin](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/) and using [NoScript](https://addons.mozilla.org/en-US/firefox/addon/noscript/), which will set DNT on each request made. You can then configure an exclusion for my site and others by going to "about:config" and setting the following value to a space-separated regex:

```
noscript.doNotTrack.exceptions = https://*.colebaugh.com
```

I may collect some forms of personal information, such as through the use of contact and newsletter forms, which can include information like your name, email, social media handles, and IP address. These forms are configured for minimum requirements, so you won't need to supply everything. This information is collected with the same open source software mentioned above, kept on my private server, and is not shared with any third parties.

Your access to the site can also be seen by [GitHub](https://github.com), where the static content of the site is hosted, and by [CloudFlare](https://cloudflare.com), which acts as a CDN in front of the site for the unhappy days where GitHub gets DDoS'd. Comments on each article are powered by [Disqus](https://disqus.com/), and there is a [Twitter](https://www.twitter.com/) widget on the index pages. To avoid this tracking, you can use Tor to visit the website. For a granular filter of which  remote resources on this site (and others) can be loaded, I highly recommend [uMatrix](https://addons.mozilla.org/en-US/firefox/addon/umatrix/). You can also use [DecentralEyes](https://addons.mozilla.org/en-US/firefox/addon/decentraleyes/) to replace requests for popular CDN resources with a local cached copy so that you don't hit these third party sites.
 
