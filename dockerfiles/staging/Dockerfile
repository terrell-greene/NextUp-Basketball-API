FROM node:10.15.1

WORKDIR /usr/src/app

COPY ./package.json ./

COPY ./dist ./

RUN npm install --production

CMD ["/bin/bash"]