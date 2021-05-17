#!/bin/bash

npx eleventy

rsync -av _site/ user@dolzhenko.me:/var/www/dolzhenko.me/html/
