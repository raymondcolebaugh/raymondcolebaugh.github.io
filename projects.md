---
title: Projects
layout: page
permalink: /projects/
---

{% for project in site.projects %}
  {% if project.title %}
### {{ project.title }}
--------------------------------------

{{ project.content }}

{% if project.link %}
* [Website]({{ project.link }})
{% endif %}
{% if project.repo %}
* [Code]({{ project.repo }})
{% endif %}

  {% endif %}
{% endfor %}

