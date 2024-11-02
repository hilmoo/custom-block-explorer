FROM node:18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

ARG REACT_APP_PROVIDER='http://127.0.0.1:8545'
ARG REACT_APP_WS_PROVIDER='ws://localhost:8545'
ENV REACT_APP_PROVIDER=$REACT_APP_PROVIDER
ENV REACT_APP_WS_PROVIDER=$REACT_APP_WS_PROVIDER

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
