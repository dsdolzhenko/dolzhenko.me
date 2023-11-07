#!/usr/bin/env bash

set -e

cd "${BASH_SOURCE%/*}"/..

rm -rf _site && npx @11ty/eleventy
