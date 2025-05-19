#!/bin/sh

# Substitution des variables dans le fichier JS
envsubst < /usr/share/nginx/html/env-config.js > /usr/share/nginx/html/env-config.generated.js
mv /usr/share/nginx/html/env-config.generated.js /usr/share/nginx/html/env-config.js

# Démarrage de Nginx
exec nginx -g 'daemon off;'
