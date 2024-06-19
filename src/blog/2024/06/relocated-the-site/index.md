---
date:  2024-06-18T08:10+00:00
title: Relocated the site
picture:
  path: uptime.png
  caption: You served me well, but it's time to say goodbye
  alt: Output of the uptime command displaying 300 days of uptime
tags:
  - site
---

{% picture "uptime.png", "Output of the uptime command displaying 300 days of uptime", "You served me well, but it's time to say goodbye" %}

I've relocated this website to a new server. They old one served well, but it was too beefy and expensive to serve such a small web-site.
We used to play Minecraft and I hosted a server for it there, but it's been idle for a long time now.

Instead of a dedicated server (droplet) on DigitalOcean, the site now runs on a smallest shared vCPU server available on Hetzner.
Now it costs me only 4.59 EUR a month, instead 12 EUR a month. And I still have place to host my another website and my wife's website.

The other reason for relocation was that I wanted to try [Caddy](https://caddyserver.com/) instead of [nginx](https://nginx.org/en/).
Caddy promises to be much simpler in operation and provides automatic SSL certificate generation out of the box.

The only things I needed to do after I created a server in Hetzner console were to [install Caddy](https://caddyserver.com/docs/install#debian-ubuntu-raspbian),
put the following lines in its configuration file and restart it with `sudo systemctl restart caddy`:

```
dolzhenko.me {
	root * /var/www/dolzhenko.me
	file_server
}
```
