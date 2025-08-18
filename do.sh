#!/usr/bin/env bash

set -e

SCRIPT_DIR="${BASH_SOURCE%/*}"
cd "$SCRIPT_DIR"

show_help() {
    cat << EOF
Usage: ./do.sh COMMAND [options]

Commands:
    serve           Start development server with hot reload (port 8080)
    build           Build the static site to dist/
    deploy          Deploy the website via rsync
    post            Create a new blog post interactively
                    Options: -c COLLECTION (default: blog)
    now             Create/edit today's now page entry
    help            Show this help message

Examples:
    ./do.sh serve                  # Start dev server
    ./do.sh build                  # Build site
    ./do.sh post                   # Create new blog post
    ./do.sh post -c projects       # Create post in projects collection
    ./do.sh now                    # Edit today's now page
    ./do.sh deploy                 # Deploy to server

EOF
}

post() {
    COLLECTION="blog"
    while getopts c: FLAG
    do
        case "${FLAG}" in
            c) COLLECTION=${OPTARG};;
            *) echo "Usage: ./do.sh post [-c COLLECTION]"
               exit 1
        esac
    done

    echo "Collection: ${COLLECTION}"
    DATE=$(date -Iminutes -u)
    echo "Date: ${DATE}"
    read -r -e -p "Title: " TITLE
    DEFAULT_SLUG=$(npx slugify-cli "${TITLE}")
    read -r -e -p "Slug [${DEFAULT_SLUG}]: " SLUG
    SLUG=${SLUG:-${DEFAULT_SLUG}}
    POST_DIR="$SCRIPT_DIR/src/${COLLECTION}/$(date +"%Y")/$(date +"%m")/$SLUG"
    POST="$POST_DIR/index.md"

    if [[ ! -f $POST ]]; then
        mkdir -p "${POST_DIR}"
        cat > "${POST}" << EOL
---
date:  ${DATE}
title: ${TITLE}
---
EOL
    fi

    ${EDITOR:-nano} "${POST}"
}

case "${1:-help}" in
    serve)
        npx @11ty/eleventy --serve
        ;;

    build)
        npx @11ty/eleventy
        ;;

    deploy)
        rsync -razP --delete dist/ dolzhenko@dolzhenko.me:/var/www/dolzhenko.me
        ;;

    post)
        shift
        post
        ;;

    now)
        DATE=$(date +"%Y-%m-%d")
        POST="$SCRIPT_DIR/src/now/${DATE}.md"

        if [[ ! -f $POST ]]; then
            touch "$POST"
        fi

        "${EDITOR:-vi}" "$POST"
        ;;

    help|--help|-h)
        show_help
        ;;

    *)
        echo "Error: Unknown command '${1}'"
        echo ""
        show_help
        exit 1
        ;;
esac
