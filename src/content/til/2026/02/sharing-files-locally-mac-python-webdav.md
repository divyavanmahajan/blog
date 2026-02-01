---
title: "Quick local file sharing on macOS (Python & WebDAV)"
description: "Copy-paste one-liners for sharing the current directory with basic auth on macOS."
pubDate: 2026-02-01
tags: ["macos", "terminal", "python", "networking", "webdav"]
draft: false
---

Here are **copy-paste one-liners** that work on macOS. All of them serve the *current directory* and require **basic auth**.

---

## 1) Simple HTTP share (Python stdlib, with Basic Auth)

Python doesn’t ship auth-enabled `http.server`, but you can do it in a one-liner:

```sh
python3 -c 'from http.server import HTTPServer,SimpleHTTPRequestHandler;import base64;U,P="user","pass";class H(SimpleHTTPRequestHandler): 
 def do_HEAD(s): s.send_response(200); s.end_headers()
 def do_AUTHHEAD(s): s.send_response(401); s.send_header("WWW-Authenticate","Basic realm=\"share\""); s.end_headers()
 def do_GET(s):
  if s.headers.get("Authorization")!="Basic "+base64.b64encode(f"{U}:{P}".encode()).decode(): s.do_AUTHHEAD(); return
  super().do_GET()
HTTPServer(("",8000),H).serve_forever()'
```

📌 Access at: `http://localhost:8000`
📌 Change `user`, `pass`, or port as needed

---

## 2) WebDAV (recommended, more robust)

### Option A — **wsgidav** (best choice)

```sh
pip3 install --quiet wsgidav && wsgidav --host=0.0.0.0 --port=8080 --root=. --auth=basic --user user --password pass
```

📌 WebDAV URL: `http://localhost:8080/`
📌 Works great with Finder, Cyberduck, rclone, etc.

---

### Option B — **macOS built-in Apache WebDAV** (no pip, heavier)

```sh
sudo mkdir -p /Library/WebServer/WebDAV && sudo chmod 755 /Library/WebServer/WebDAV && sudo apachectl start
```

Then you must edit config files (`httpd.conf`, `httpd-dav.conf`, password file).
⚠️ **Not a true one-liner**, but included since it’s native.

---

## Quick comparison

| Method        | Auth | Setup   | Best for                    |
| ------------- | ---- | ------- | --------------------------- |
| Python HTTP   | ✅    | Instant | Quick ad-hoc sharing        |
| wsgidav       | ✅    | Easy    | Finder / WebDAV clients     |
| Apache WebDAV | ✅    | Heavy   | Long-running system service |
