FROM php:8.0.3-fpm-alpine

WORKDIR /var/www/wedeome

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

COPY --chown=root:root . /var/www/wedeome

EXPOSE 9000
