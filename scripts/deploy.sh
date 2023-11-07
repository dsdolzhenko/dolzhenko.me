#!/usr/bin/env bash

set -e

cd "${BASH_SOURCE%/*}"/..

scp -r _site/* dolzhenko@dolzhenko.dev:/var/www/dolzhenko.dev
