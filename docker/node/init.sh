#!/bin/bash
echo "hello world"
if [ -d /var/www/html/node_modules ]; then
  echo "node_modules directory exists"
else
  echo "node_modules directory doesn't exist. Running npm install"
  cd "/var/www/html" && npm install -y
fi
cd /var/www/html
npm start