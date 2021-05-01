FROM node:alpine

RUN mkdir -p /var/www
WORKDIR /var/www

COPY . /var/www

RUN npm install
EXPOSE 5001
CMD npm run start
