#!/bin/bash

set -euo pipefail

# Project root and Compose project name (used for named volumes)
PROJECT_ROOT="$(pwd)"
DEFAULT_PROJECT_NAME="$(basename "$PROJECT_ROOT")"
VOLUME_PREFIX="${VOLUME_PREFIX:-$DEFAULT_PROJECT_NAME}"

# Volumes that match docker-compose.yml mounts on nginx
VOL_CERT_ETC="${VOLUME_PREFIX}_certbot-etc"
VOL_CERT_WEBROOT="${VOLUME_PREFIX}_certbot-webroot"
WEBROOT="/var/www/certbot"

# Email and domains (override via env; or pass domains as arguments)
EMAIL="${EMAIL:-sepehrxsohrabpour@gmail.com}"
STAGING="${STAGING:-false}"
# Challenge mode: webroot (default) or standalone
CHALLENGE_MODE="${CHALLENGE_MODE:-webroot}"

# Default domain set; override with DOMAINS env or CLI args
DEFAULT_DOMAINS=(
    hooshpod.ai
    www.hooshpod.ai
    hooshpod.org
    www.hooshpod.org
    hooshpod.net
    www.hooshpod.net
    hooshpod.com
    www.hooshpod.com
    hooshpardazan.com
    www.hooshpardazan.com
    www.imperialclass.net
    imperialclass.net
    www.imperialclass.info
    imperialclass.info
    chat.hooshpod.org
    www.chat.hooshpod.org
)

if [[ $# -gt 0 ]]; then
    # Domains passed as CLI args
    DOMAINS=("$@")
elif [[ -n "${DOMAINS:-}" ]]; then
    # DOMAINS provided via env (space-separated)
    # shellcheck disable=SC2206
    DOMAINS=(${DOMAINS})
else
    DOMAINS=("${DEFAULT_DOMAINS[@]}")
fi

domains_args=()
for d in "${DOMAINS[@]}"; do
    domains_args+=( -d "$d" )
done

echo "Using volume prefix: $VOLUME_PREFIX"
echo "Email: $EMAIL"
echo "Domains: ${DOMAINS[*]}"
echo "Staging: $STAGING"
echo "Challenge mode: $CHALLENGE_MODE"

args=(certonly --agree-tos --no-eff-email --non-interactive --email "$EMAIL" \
  "${domains_args[@]}")

if [[ "$CHALLENGE_MODE" == "webroot" ]]; then
  args=(certonly --webroot -w "$WEBROOT" \
    --agree-tos --no-eff-email --non-interactive --email "$EMAIL" \
    "${domains_args[@]}")
elif [[ "$CHALLENGE_MODE" == "standalone" ]]; then
  args=(certonly --standalone \
    --agree-tos --no-eff-email --non-interactive --email "$EMAIL" \
    "${domains_args[@]}")
else
  echo "Error: Unknown CHALLENGE_MODE '$CHALLENGE_MODE'. Use 'webroot' or 'standalone'." >&2
  exit 1
fi

if [[ "$STAGING" == "true" ]]; then
  args+=( --staging )
fi

docker run -it --rm --name certbot \
    -v "$VOL_CERT_ETC":/etc/letsencrypt \
    -v "$VOL_CERT_WEBROOT":"$WEBROOT" \
    --network host \
    certbot/certbot:latest "${args[@]}"

echo "Certificates obtained/renewed. Reloading Nginx..."
# Try docker-compose service name 'nginx' first; fallback to container named 'nginx'
if docker compose ps nginx >/dev/null 2>&1; then
  docker compose exec -T nginx nginx -s reload || true
elif docker ps --format '{{.Names}}' | grep -q '^nginx$'; then
  docker exec -i nginx nginx -s reload || true
else
  echo "Warning: Could not find running nginx container to reload."
fi