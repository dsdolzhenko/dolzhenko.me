#!/usr/bin/env bash

set -e

cd "${BASH_SOURCE%/*}"/..

npx @11ty/eleventy
