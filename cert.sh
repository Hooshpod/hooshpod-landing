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

docker run -it --rm --name certbot \
    -v "$VOL_CERT_ETC":/etc/letsencrypt \
    -v "$VOL_CERT_WEBROOT":"$WEBROOT" \
    certbot/certbot:latest certonly --webroot -w "$WEBROOT" \
    --agree-tos --no-eff-email --non-interactive --email "$EMAIL" \
    "${domains_args[@]}"