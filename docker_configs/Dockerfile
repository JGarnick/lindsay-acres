FROM erseco/alpine-php-webserver:latest

RUN sed -i -e "s/root\s*\/var\/www\/html/root \/var\/www\/html\/public/g" /etc/nginx/nginx.conf

USER root
RUN apk --no-cache add \
    composer \
    php81-xmlwriter \
    php81-pdo_mysql \
    php81-pdo

USER nobody