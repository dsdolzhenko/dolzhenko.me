[positional-arguments]
post *args='':
        @./scripts/post.sh "$@"

discard:
        @./scripts/discard.sh

now:
        @./scripts/now.sh

list:
        @./scripts/list.sh || true

build:
        @./scripts/build.sh

deploy:
        @./scripts/deploy.sh

serve:
        @./scripts/serve.sh
