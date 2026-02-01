---
title: "Quick local file sharing on macOS"
description: "Copy-paste one-liners for sharing the current directory on macOS."
pubDate: 2026-02-02
tags: ["macos", "terminal", "python", "networking", "apache", "webdav"]
draft: false
---

Today I needed to share a directory of files that were about 2GB but had no USB stick to transfer them. As both of us were on the same local network, it was time for a quick hack and setup a webserver/webdav to share the files. Here are **copy-paste one-liners** that work on macOS. The first two share the current directory and the Apache option shares /Library/WebServer/WebDAV. The consolidated scripts were cleaned up with ChatGPT.


## Quick comparison

| Method        | Auth | Setup   | Best for                    |
| ------------- | ---- | ------- | --------------------------- |
| Python HTTP   | No    | Instant | Quick ad-hoc sharing without authentication       |
| wsgidav       | Yes    | Easy    | Finder / WebDAV clients     |
| Apache WebDAV | Yes   | Heavy   | Long-running system service |

---

# Simple HTTP share 
This uses Python's stdlib and does not support any authentication.

```sh
python3 -m http.server 18080
```

This will start a http server on port 18080 and share the contents of the current directory without any authentication. 

---


# WSGIDAV — best option

Requires an installation of wsgidev in Python. macOS blocks `pip install` into system Python, so you have **two sane options**. Note: please change `user` / `pass` as needed!

**Temp install - Throwaway one time**

If you really want a throwaway one time, you can use this single liner.

```sh
python3 -m venv /tmp/wsgidav.$$ && source /tmp/wsgidav.$$/bin/activate && pip install -q wsgidav lxml cheroot && printf '{ "host":"0.0.0.0","port":18080,"provider_mapping":{"/":{"root":".","readonly":false}},"simple_dc":{"user_mapping":{"*":{"user":{"password":"pass"}}}},"http_authenticator":{"domain_controller":"wsgidav.dc.simple_dc.SimpleDomainController"} }' > /tmp/wsgidav.$$/conf.json && wsgidav --server cheroot --config /tmp/wsgidav.$$/conf.json

```

**Permanent install - WSGIDAV in a venv**


```sh
python3 -m venv ~/wsgidav-venv
source ~/wsgidav-venv/bin/activate
pip install wsgidav cheroot lxml
cat > ~/wsgidav.conf <<'EOF'
{
  "host": "0.0.0.0",
  "port": 18080,
  "provider_mapping": {
    "/": {
      "root": ".",
      "readonly": false
    }
  },
  "simple_dc": {
    "user_mapping": {
      "*": {
        "user": {
          "password": "pass"
        }
      }
    }
  },
  "http_authenticator": {
    "domain_controller": "wsgidav.dc.simple_dc.SimpleDomainController"
  },
  "verbose": 1
}
EOF
```



## Start WSGIDAV

```sh
wsgidav --config ~/wsgidav.conf
```

## How to Access

* **Finder → Go → Connect to Server**

  ```
  http://localhost:18080/
  ```
* **curl**

  ```sh
  curl -u user:pass http://localhost:18080/
  ```

---

## Stop WSGIDAV

```sh
Ctrl+C
```

---

# Built-in Apache WebDAV
An alternative to WSGIDAV is to use the built-in Apache WebDAV. This is a bit more involved, but it is a system service. 

The setup script combines multiple steps into a single script:

* Enables WebDAV
* Creates the share dir
* Adds basic auth
* Wires `/WebDAV`
* Restarts Apache

### Setup script

```sh
#!/bin/bash
set -e

USER_NAME="user"
PASS_FILE="/etc/apache2/webdav.passwd"
DAV_DIR="/Library/WebServer/WebDAV"
CONF="/etc/apache2/extra/httpd-webdav.conf"
HTTPD="/etc/apache2/httpd.conf"

echo "Enabling WebDAV modules..."
sudo sed -i '' 's/#LoadModule dav_module/LoadModule dav_module/' $HTTPD
sudo sed -i '' 's/#LoadModule dav_fs_module/LoadModule dav_fs_module/' $HTTPD

echo "Creating WebDAV directory..."
sudo mkdir -p "$DAV_DIR"
sudo chown -R _www:_www "$DAV_DIR"
sudo chmod -R 755 "$DAV_DIR"

echo "Creating password file..."
sudo htpasswd -c "$PASS_FILE" "$USER_NAME"

echo "Writing WebDAV config..."
sudo tee "$CONF" >/dev/null <<EOF
Alias /WebDAV $DAV_DIR

<Directory "$DAV_DIR">
    DAV On
    AuthType Basic
    AuthName "WebDAV"
    AuthUserFile $PASS_FILE
    Require valid-user
    Options Indexes
</Directory>
EOF

echo "Including WebDAV config..."
grep -q "httpd-webdav.conf" $HTTPD || \
  echo "Include /etc/apache2/extra/httpd-webdav.conf" | sudo tee -a $HTTPD

echo "Restarting Apache..."
sudo apachectl restart

echo
echo " WebDAV ready:"
echo "   http://localhost/WebDAV/"
```

Save as `webdav.sh`, then:

```sh
chmod +x webdav.sh
./webdav.sh
```

---

## Access

* **Finder** → Go → Connect to Server

  ```
  http://localhost/WebDAV/
  ```
* Files live in:

  ```
  /Library/WebServer/WebDAV
  ```

---

## Stop / disable Apache WebDAV

### Stop Apache completely

```sh
sudo apachectl stop
```

### Start again

```sh
sudo apachectl start
```

### Fully remove WebDAV (optional cleanup)

```sh
sudo rm /etc/apache2/extra/httpd-webdav.conf
sudo rm /etc/apache2/webdav.passwd
sudo apachectl restart
```

---
