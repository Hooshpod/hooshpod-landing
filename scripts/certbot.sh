#!/usr/bin/env bash

set -euo pipefail

# Project root (directory containing this script)/..
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="${SCRIPT_DIR%/scripts}"
cd "$PROJECT_ROOT"

COMPOSE="docker compose"
WEBROOT="/var/www/certbot"

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
  up        Start background certbot renewer service
  help      Show this help

Environment overrides:
  EMAIL      Account email for Let's Encrypt (default: ${EMAIL})
  DOMAINS    Space-separated domains. Example:
             DOMAINS="example.com www.example.com" $0 issue
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
  $COMPOSE run --rm \
    -e EMAIL="$EMAIL" \
    certbot certonly --webroot -w "$WEBROOT" \
    $(domains_args) \
    --agree-tos --non-interactive --email "$EMAIL"

  echo "Reloading nginx to pick up new certificates..."
  $COMPOSE exec nginx nginx -s reload
}

cmd_renew() {
  echo "Running certbot renew (webroot: $WEBROOT) ..."
  $COMPOSE run --rm certbot renew --webroot -w "$WEBROOT" --quiet
}

cmd_reload() {
  echo "Reloading nginx..."
  $COMPOSE exec nginx nginx -s reload
}

cmd_up() {
  echo "Starting background certbot renewer service..."
  $COMPOSE up -d certbot
}

case "${1:-help}" in
  issue)  cmd_issue ;;
  renew)  cmd_renew ;;
  reload) cmd_reload ;;
  up)     cmd_up ;;
  help|*) usage ;;
esac


