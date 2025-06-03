# Utilisez une image officielle de Node.js comme image de base
FROM node:18-alpine AS build

ARG ENV="dev"

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le fichier .env
COPY .prod.env ./.env

# Copiez le reste des fichiers de l'application
COPY . .

# Construisez l'application React
RUN npm run build

# Utilisez une image légère pour servir l'application
FROM nginx:alpine

ARG ENV="dev"

# Copiez les fichiers de construction de l'application React
COPY --from=build /app/build /usr/share/nginx/html

# Copiez la configuration personnalisée de Nginx si nécessaire
COPY nginx.prod.conf /etc/nginx/conf.d/default.conf

# Exposez le port sur lequel l'application sera accessible
EXPOSE 3000

# Lancez Nginx pour servir l'application
CMD ["nginx", "-g", "daemon off;"]
