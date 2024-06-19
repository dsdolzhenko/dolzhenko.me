#!/usr/bin/env bash

set -e

DATE=$(date -Iminutes -u)
echo "date: ${DATE}"
read -e -p "title: " TITLE
DEFAULT_SLUG=$(npx slugify-cli "${TITLE}")
read -e -p "slug [${DEFAULT_SLUG}]: " SLUG
SLUG=${SLUG:-${DEFAULT_SLUG}}
POST_DIR="${BASH_SOURCE%/*}"/../src/blog/$(date +"%Y")/$(date +"%m")/$SLUG
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
