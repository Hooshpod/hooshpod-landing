### TLS/HTTPS with Let's Encrypt

Prereqs:

- DNS A/AAAA records for: hooshpod.ai hooshpod.org hooshpod.net hooshpod.com hooshpardazan.com pointing to this server.

Bring up Nginx and web first:

```bash
docker compose up -d nginx web
```

Issue initial certificates (webroot):

```bash
docker compose run --rm \
  -e EMAIL=admin@hooshpod.ai \
  certbot certonly --webroot -w /var/www/certbot \
  -d hooshpod.ai -d www.hooshpod.ai \
  -d hooshpod.org -d www.hooshpod.org \
  -d hooshpod.net -d www.hooshpod.net \
  -d hooshpod.com -d www.hooshpod.com \
  -d hooshpardazan.com -d www.hooshpardazan.com \
  --agree-tos --non-interactive --email admin@hooshpod.ai
```

Reload Nginx to pick up certs:

```bash
docker compose exec nginx nginx -s reload
```

Enable background renewer:

```bash
docker compose up -d certbot
```

Manual renew and reload (optional):

```bash
docker compose run --rm certbot renew --webroot -w /var/www/certbot --quiet
docker compose exec nginx nginx -s reload
```
