FROM php:8.3-cli

RUN apt-get update && \
    apt-get install -y \
                   libpq-dev \
                   wget \
                   zlib1g-dev \
                   libmcrypt-dev \
                   git \
                   libzip-dev

RUN docker-php-ext-install pdo pdo_pgsql pgsql zip

RUN wget https://getcomposer.org/installer -O - -q | php -- --install-dir=/bin --filename=composer --quiet
RUN wget https://get.symfony.com/cli/installer -O - | bash
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/symfony
RUN git config --global user.email "you@example.com"
RUN git config --global user.name "Your Name"
#composer install ?
# install symfony bin
EXPOSE 8000
WORKDIR /var/www/html
COPY ./init.sh /scripts/init.sh
ENTRYPOINT ["/bin/bash", "/scripts/init.sh"]
