FROM node:14.15

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

EXPOSE 8080

CMD ["node", "app.js"]
