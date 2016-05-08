---
title: Projects
layout: page
permalink: /projects/
---

{% for project in site.projects %}
  {% if project.title %}
### [{{ project.title }}]({{ project.url | prepend: site.baseurl }})
  
{{ project.description }}

  {% endif %}
{% endfor %}

<div class="push"></div>
