FROM node:current-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

CMD ["npm", "run" , "dev"]
EXPOSE 5000