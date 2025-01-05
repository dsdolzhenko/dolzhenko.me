#!/usr/bin/env bash

set -e

cd "${BASH_SOURCE%/*}"/..

rsync -razP --delete dist/ dolzhenko@dolzhenko.me:/var/www/dolzhenko.me
