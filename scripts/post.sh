#!/usr/bin/env bash

set -e

COLLECTION="blog"
while getopts c: FLAG
do
    case "${FLAG}" in
        c) COLLECTION=${OPTARG};;
        *) echo "Usage: $0 [-c]"
    esac
done
echo "${COLLECTION}"

DATE=$(date -Iminutes -u)
echo "date: ${DATE}"
read -r -e -p "title: " TITLE
DEFAULT_SLUG=$(npx slugify-cli "${TITLE}")
read -r -e -p "slug [${DEFAULT_SLUG}]: " SLUG
SLUG=${SLUG:-${DEFAULT_SLUG}}
POST_DIR="${BASH_SOURCE%/*}"/../src/"${COLLECTION}"/$(date +"%Y")/$(date +"%m")/$SLUG
POST=$POST_DIR/index.md

if [[ ! -f $POST ]]; then
    mkdir -p "${POST_DIR}"
    cat > "${POST}" << EOL
---
date:  ${DATE}
title: ${TITLE}
---
EOL
fi

${EDITOR:-vi} "${POST}"
