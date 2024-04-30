#!/bin/bash
cd /var/www/html
if [ -d /var/www/html/vendor ]; then
  echo "vendor directory exists"
else
  echo "vendor directory doesn't exist. Running composer install"
  cd "/var/www/html" && composer install
fi
#php -S 0.0.0.0:8080 what.php
symfony server:start
#php bin/console server:start *:8080
