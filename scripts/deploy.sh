#!/usr/bin/env bash

set -e

cd "${BASH_SOURCE%/*}"/..

rsync -razP --delete dist/ dolzhenko@dolzhenko.dev:/var/www/dolzhenko.me
