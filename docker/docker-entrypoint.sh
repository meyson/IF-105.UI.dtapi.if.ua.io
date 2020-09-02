#!/bin/sh

set -eux;
vhostdir="/usr/local/apache2/htdocs"
find $vhostdir -type f -exec sed -i "s/https:\/\/dtapi.if.ua\/api\//$API_ENDPOINT/g" {} +
exec "$@"