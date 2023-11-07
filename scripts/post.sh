#!/usr/bin/env bash

set -e

DATE=$(date +"%Y-%m-%d")
echo "date: ${DATE}"
read -p "title: " TITLE
SLUG=$(npx slugify-cli "${TITLE}")
POST_DIR="${BASH_SOURCE%/*}"/../blog/$DATE-$SLUG
POST=$POST_DIR/index.md

if [[ ! -f $POST ]]; then
    mkdir -p $POST_DIR
    cat > $POST << EOL
---
date:  ${DATE}
title: ${TITLE}
slug: ${SLUG}
---
EOL
fi

"${EDITOR:-vi}" $POST
