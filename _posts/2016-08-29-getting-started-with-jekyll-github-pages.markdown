---
layout: post
title:  "Getting Started with Jekyll and GitHub Pages"
date:   2016-08-27 19:35:27 -0700
category: jekyll
tags: jekyll
comments: true
published: true
---

Are you are creating your personal site, but don’t want to commit to purchasing a new host to serve it from? Not to worry: GitHub has your back! Using [GitHub Pages](https://pages.github.com/), you can host your static site for free! This is a great alternative to a shared web host, allowing you to deploy your site with a mere git push. This makes it perfect for open source projects or startups on a lean budget. But what can I do with a static site?! GitHub supports Jekyll, giving your static site the flexibility a “dynamic” site might have.

[Jekyll](https://jekyllrb.com/) is a Ruby gem that allows you to write your static website in a collection of modular pieces. It has support for SCSS and Markdown, making it a popular choice among hackers. Jekyll even comes prepared to organize content into a blog by default! Running `jekyll build` renders the source into static sources under `_site`. You can also use Webrick to serve your application by running `jekyll serve`.

### Creating Your First Application
First, create a new repository on GitHub named _username_.github.io and check it out. Then, install the Jekyll gem and create your initial application using the command `jekyll app ./path`.


```bash
$ git clone git@github.com:username/username.github.io
$ cd username.github.io
$ sudo gem install jekyll
$ jekyll new .
```

After generating the default source, you'll have a directory tree similar to the following:

```bash
$ tree
.
├── about.md
├── _config.yml
├── css
│   └── main.scss
├── feed.xml
├── _includes
│   ├── footer.html
│   ├── header.html
│   ├── head.html
│   ├── icon-github.html
│   ├── icon-github.svg
│   ├── icon-twitter.html
│   └── icon-twitter.svg
├── index.html
├── _layouts
│   ├── default.html
│   ├── page.html
│   └── post.html
├── _posts
│   └── 2016-05-31-welcome-to-jekyll.markdown
└── _sass
    ├── _base.scss
    ├── _layout.scss
    └── _syntax-highlighting.scss

5 directories, 19 files
```

In another terminal (or preferably a screen or tmux session), execute `jekyll --serve --incremental`.

Jekyll supports the use of "layouts," a concept used in many web application frameworks. Building your source renders the main content on each page within a shared page "layout." This reduces the amount of code you need to write and keeps your code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). To define variables specific to a certain post, prefix the files with a Front Matter header. This is an embedded YAML document, and contains metadata such as the page title or the permalink.

```
---
layout: post
title: Looking for Placeholder Text?
---

Lorem ipsum...
```
First things first, update your details in your `_config.yml`. Information defined here will be available in the site variable, for example `site.github_username`. If you'll be serving the site under a URI such as '/blog', make sure to set the `baseurl` field. Match the protocol of your `url` field with the proper protocol if you'll be serving the site under TLS. Now update the Twitter and GitHub username fields to populate the links in your footer.

```
title: Your Website!
subtitle: Subtitle
email: youremail@example.com
description: > # this means to ignore newlines until "baseurl:"
    Your site desctiption.
baseurl: "" # the subpath of your site, e.g. /blog
url: "https://example.com" # the base hostname & protocol for your site
twitter_username: your_username
github_username:  your_username
```
Be sure to enter a meaningful description of your site! This populates the meta description tag on your site. Search Engine Result Pages might place it in the description of your page. You also want to include your targeted keywords here to boost SEO. Check out [Google Trends](https://google.com/trends) for analyzing specific keyword search trends. Then checkout [Google Keyword Planner](https://adwords.google.com/KeywordPlanner) for more keyword and ad group ideas. This will come in handy when you're designing and writing content to enhance SEO.

Partial fragments of mark(up\|down) can be included from the `_includes` directory by using Liquid tags, such as:

```html
<section class="header">
    {% raw %}{% include header.html %}{% endraw %}
</section>
```

 The `_site` directory contains the rendered site, and should be configured to be ignored by your version control system.

### Advanced Asset Management
As you progress, you'll start bringing in external sources, CSS frameworks, JavaScript libraries, etc. At this point, it can be beneficial to add more advanced asset handling capabilities. [jekyll-assets](https://github.com/jekyll/jekyll-assets) uses Sprockets to provide asset pipeline functionality. This functionality will be familiar to anyone coming from Ruby on Rails. Besides syncing your vendor sources, jekyll-assets also supports:

* file digesting
* asset compression
* CDN usage
* Many addons, including Bootstrap and Font Awesome.

First, install the gem `jekyll-assets`, then add the following to your `_config.yml`:

```
gems:
    - jekyll-assets
assets:
    assets:
    - "*.js"
    - "*.css"
    - "*.png"
    - "*.jpg"
    sources:
    - _assets/images
    - _assets/javascripts
    - _assets/stylesheets
```
Whitelist the file types that you intend on serving and specify your asset directories. jekyll-assets will ignore any assets not matching the specified patterns.

Unfortunately, we cannot execute dynamic Jekyll plugins like these when hosting on GitHub pages. This reduces the potential for attack on their infrastructure. To get around this limitation, first build your static site. Then, push the results into the root of your master branch. You'll need to then maintain development in another branch, such as "source" or "dev."

To handle updates, you can create a Rake task to handle pushing your site to GitHub. Create a new file name `Rakefile` and insert something like:

```ruby
# Github pages publishing.
require "jekyll"
require 'tmpdir'

desc "Publish Github pages site"
task :publish do
    # Compile the Jekyll site using the config.
    Jekyll::Site.new(Jekyll.configuration({
      "source"      => ".",
      "destination" => "_site",
      "config" => "_config.yml"
    })).process

    origin = 'git@github.com:username/username.github.io.git'

    Dir.mktmpdir do |tmp|
      cp_r "_site/.", tmp
      Dir.chdir tmp

      system "git init"
      system "git add . && git commit -m 'Site updated at #{Time.now.utc}'"
      system "git remote add origin #{origin}"
      system "git push origin master --force"
    end
end
```
This enables you to generate and push updates to your live site by executing `rake publish`! See the related link below for more detail on using a method such as this.

### Conclusion
Jekyll is awesome; you can go from zero to sixty in no time! Publishing new content is a breeze, too. Just write out your posts in comfort using Markdown, set the post date, and `rake publish`. Keep an eye out and subscribe by email or RSS to learn more in future posts, including:

* Comments with Disqus
* Tagging and categories
* Site search with Algolia
* Tips to boost your SEO.

Anything else you might need? Leave questions or feedback in the comments below!

### Related Information
* [GitHub Pages Docs](https://help.github.com/categories/github-pages-basics/)
* [Using Jekyll plugins on GitHub Pages](http://ixti.net/software/2013/01/28/using-jekyll-plugins-on-github-pages.html)
