#!/usr/bin/env bash

set -e

DATE=$(date +"%Y-%m-%d")
echo "date: ${DATE}"
read -p "title: " TITLE
DEFAULT_SLUG=$(npx slugify-cli "${TITLE}")
read -p "slug [$DEFAULT_SLUG}]: " SLUG
SLUG=${SLUG:-${DEFAULT_SLUG}}
POST_DIR="${BASH_SOURCE%/*}"/../blog/$(date +"%Y")/$(date +"%m")/$SLUG
POST=$POST_DIR/index.md

if [[ ! -f $POST ]]; then
    mkdir -p $POST_DIR
    cat > $POST << EOL
---
date:  ${DATE}
title: ${TITLE}
---
EOL
fi

"${EDITOR:-vi}" $POST
