#!/usr/bin/env bash

set -e

DATE=$(date +"%Y-%m-%d")
POST="${BASH_SOURCE%/*}"/../now/$(date +"%Y-%m-%d").md

if [[ ! -f $POST ]]; then
    touch $POST
fi

"${EDITOR:-vi}" $POST
