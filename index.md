---
layout: default
title: Jordan Marinov
---

Information technology professional with extensive experience building, managing, and leading software teams — delivering scalable solutions built on resilient, sustainable architecture. Background spans backend systems, cloud computing, big data, dev-ops, remote fleet administration, and mobile applications, with stops at companies including Honey, Atom Tickets, Amazon, and OvernightPrints.com. Holder of three U.S. patents related to device testing and content management. Educated in California and Bulgaria.

Outside of work: FPV drones, embedded electronics and microcontrollers, 3D printing, guitars, and RV camping. Licensed amateur radio operator (FCC callsign KK6VYN) and AMA member.

*(This bio was pulled from an older version of this site — worth double-checking the employer/role details are still current before publishing.)*

### Find me elsewhere

- [Projects](/projects/)
- [YouTube — FPV flying & builds](https://www.youtube.com/channel/UCVHbnEiLt9DymbX9XdnYadQ)
- [YouTube — general channel](https://www.youtube.com/user/jaisor)
- [GitHub](https://github.com/jaisor)
- [LinkedIn](https://www.linkedin.com/in/jaisor)
- [Instagram](https://www.instagram.com/jaisorbl/)
- [Facebook](https://www.facebook.com/jordan.marinov.7)

### Latest posts

<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <small>— {{ post.date | date: "%b %-d, %Y" }}</small>
  </li>
{% endfor %}
</ul>
