FROM node:latest

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn add react-scripts
RUN yarn install


COPY . ./

EXPOSE 3000

CMD ["yarn", "start"]