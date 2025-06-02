FROM nginx:alpine

WORKDIR /app

ARG ENVIRONNEMENT
COPY ./conf.d/${ENVIRONNEMENT}.conf /etc/nginx/conf.d/default.conf
COPY ./build/ /usr/share/nginx/html


EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]