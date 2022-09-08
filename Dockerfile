FROM node:14

RUN mkdir /app
WORKDIR /app

# Install packages
COPY package.* /app
COPY yarn.lock /app
RUN yarn install

# Build
COPY . /app/
RUN npm run build

CMD npm run start
