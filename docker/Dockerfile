FROM httpd:2.4.46-alpine

COPY ./docker/httpd.conf /usr/local/apache2/conf/httpd.conf

# copy source files
COPY --chown="www-data:www-data" ./dist/IF105/ /usr/local/apache2/htdocs/
COPY --chown="www-data:www-data" ./docker/.htaccess /usr/local/apache2/htdocs/

COPY ./docker/docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["sh", "/usr/local/bin/docker-entrypoint.sh"]
CMD ["httpd-foreground"]
