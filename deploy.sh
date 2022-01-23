#!/bin/bash

rm -rf _site
npx eleventy

rsync -avh --delete-after _site/ user@dolzhenko.me:/var/www/dolzhenko.me/html/
