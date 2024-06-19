#!/usr/bin/env bash

set -e

cd "${BASH_SOURCE%/*}"/..

rsync -razP --delete _site/ dolzhenko@dolzhenko.dev:/var/www/dolzhenko.me
