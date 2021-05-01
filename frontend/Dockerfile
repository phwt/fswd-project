FROM node:alpine

RUN mkdir -p /var/www
WORKDIR /var/www

COPY . /var/www

RUN npm run install:all

RUN npm run build
EXPOSE 3000 5001
CMD npm run start
