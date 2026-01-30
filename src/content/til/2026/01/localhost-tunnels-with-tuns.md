---
title: "Share Localhost with the World Using tuns.sh"
description: "TIL you can expose local dev servers to the internet with a single SSH command."
pubDate: 2026-01-29
tags: ["ssh", "networking", "devtools", "productivity"]
draft: false
---

Today I learned about [tuns.sh](https://pico.sh/tuns)—a service that lets you share your localhost with the internet using nothing but SSH. No CLI installation, no daemon, no firewall configuration.

## The One-Command Solution

```bash
ssh -R dev:80:localhost:3000 ash.tuns.sh
# Your local server is now live at https://{user}-dev.tuns.sh
```

That's it. Your local dev server running on port 3000 is now publicly accessible with automatic HTTPS. 
** Note: The HTTP and HTTPS works only if the public port is port 80. (above: dev:80 is the public port). **

## Why This is Useful

Skip the deployment dance when you need to:

- **Demo a prototype** to a client without deploying to staging
- **Test webhooks** from Stripe, GitHub, or Twilio against your local server
- **Debug mobile apps** against your local API
- **Collaborate in real-time** by sharing your dev environment with teammates
- **Host services from home** without exposing your network

## Quick Reference

```bash
# Expose a web server on port 8000
ssh -R dev:80:localhost:8000 tuns.sh
# → https://{user}-dev.tuns.sh

# Expose a TCP service (e.g., database)
ssh -R 0:5432:localhost:5432 tuns.sh
# → tuns.sh:{assigned-port}

# SSH proxy jump (access remote machine via tunnel)
ssh -R mybox:22:localhost:22 tuns.sh
# Client connects with: ssh -J tuns.sh {user}-mybox
```

## Key Features

- **Multi-region support** - Choose the closest server (e.g., `ash.tuns.sh`, `nue.tuns.sh`) for lower latency
- **Custom domains** - Point your own domain via CNAME + TXT records
- **Built-in TUI** - Monitor active tunnels with `ssh pico.sh` → select `tuns`
- **Connection alerts** - Get notified on connect/disconnect events via RSS

## Custom Domains

For your own domain, set up two DNS records:

```
customdomain.example.com    CNAME   tuns.sh
_sish.customdomain.example.com   TXT   "SHA256:{your-key-fingerprint}"
```

Get your fingerprint with:
```bash
ssh-keygen -lf ~/.ssh/id_rsa | awk '{print $2}'
```

Then tunnel through your custom domain:
```bash
ssh -R customdomain.example.com:80:localhost:8000 tuns.sh
```

## The Bottom Line

No installs. No configuration. No cloud deployment. Just SSH. Works everywhere SSH works—which is basically everywhere.

> **Note**: tuns.sh is a [pico+](https://pico.sh/plus) paid service.
