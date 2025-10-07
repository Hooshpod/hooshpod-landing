#!/usr/bin/env bash

set -euo pipefail

# Project root (directory containing this script)/..
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="${SCRIPT_DIR%/scripts}"
cd "$PROJECT_ROOT"

COMPOSE="docker compose"
WEBROOT="/var/www/certbot"

# Compose volume prefix: defaults to compose project name (repo dir basename)
DEFAULT_PROJECT_NAME="$(basename "$PROJECT_ROOT")"
VOLUME_PREFIX="${VOLUME_PREFIX:-$DEFAULT_PROJECT_NAME}"
VOL_CERT_ETC="${VOLUME_PREFIX}_certbot-etc"
VOL_CERT_WEBROOT="${VOLUME_PREFIX}_certbot-webroot"

# Defaults (can be overridden via env)
EMAIL="${EMAIL:-admin@hooshpod.ai}"
DOMAINS=(
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

usage() {
  cat <<EOF
Usage: $0 <command>

Commands:
  issue     Issue initial Let's Encrypt certs (web and nginx must be up)
  renew     Run certbot renew once (webroot mode)
  reload    Reload nginx to pick up renewed certs
  help      Show this help

Environment overrides:
  EMAIL      Account email for Let's Encrypt (default: ${EMAIL})
  DOMAINS    Space-separated domains. Example:
             DOMAINS="example.com www.example.com" $0 issue
  VOLUME_PREFIX  Docker volume prefix (default: ${VOLUME_PREFIX})
EOF
}

domains_args() {
  local args=()
  if [[ -n "${DOMAINS:-}" ]]; then
    # Use DOMAINS from env if provided (space-separated)
    # shellcheck disable=SC2206
    DOMAINS=(${DOMAINS})
  fi
  for d in "${DOMAINS[@]}"; do
    args+=( -d "$d" )
  done
  printf '%s\n' "${args[@]}"
}

cmd_issue() {
  echo "Bringing up web and nginx services..."
  $COMPOSE up -d nginx web

  echo "Issuing certificates for: ${DOMAINS[*]}"
  # Using --non-interactive and --agree-tos for automation
  docker run --rm \
    -v "$VOL_CERT_ETC":/etc/letsencrypt \
    -v "$VOL_CERT_WEBROOT":"$WEBROOT" \
    certbot/certbot:latest certonly --webroot -w "$WEBROOT" \
    $(domains_args) \
    --agree-tos --non-interactive --email "$EMAIL"

  echo "Reloading nginx to pick up new certificates..."
  $COMPOSE exec nginx nginx -s reload
}

cmd_renew() {
  echo "Running certbot renew (webroot: $WEBROOT) ..."
  docker run --rm \
    -v "$VOL_CERT_ETC":/etc/letsencrypt \
    -v "$VOL_CERT_WEBROOT":"$WEBROOT" \
    certbot/certbot:latest renew --webroot -w "$WEBROOT" --quiet
}

cmd_reload() {
  echo "Reloading nginx..."
  $COMPOSE exec nginx nginx -s reload
}

case "${1:-help}" in
  issue)  cmd_issue ;;
  renew)  cmd_renew ;;
  reload) cmd_reload ;;
  help|*) usage ;;
esac


