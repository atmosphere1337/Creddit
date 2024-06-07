#!/bin/bash
git pull origin master
docker compose --profile prod down
docker compose --profile dev down
docker compose --profile dev up -d
docker exec creddit-node-1 /bin/sh -c "cd /var/www/html; npm install; npm run build"
docker compose --profile dev down
docker compose --profile prod up -d
