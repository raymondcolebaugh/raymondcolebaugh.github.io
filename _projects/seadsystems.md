---
title: Smart Energy Analytic Disaggregation System
repo: https://github.com/seadsystem/Backend
---
The SEAD microgrid project aims to provide analysis of home power grid usage to provide analysis to optimize home energy usage. I worked on the backend data collection server software written in Go, as well as a simple Python 3 API to provide access to the data stored in a Postgres backend, which would be in turn served by the front end web app. Server provisioning was accomplished via Puppet and a couple shell scripts, and setup was tested with Vagrant. 

