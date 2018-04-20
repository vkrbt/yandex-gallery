FROM node:8.11.1
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock  ./

RUN yarn
COPY . ./
RUN yarn build
RUN yarn global add serve
CMD serve -s build -p 3000
EXPOSE 3000
