# syntax=docker/dockerfile:1

ARG NODE_VERSION=21.6.2

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

ENV PORT 8080

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies, including Prisma CLI
RUN npm ci

# Generate Prisma client

RUN npm i -g prisma

# Copy the rest of the source files into the image.
COPY . .
RUN npx prisma generate

CMD ["node", "--trace-warnings", "--watch", "server.js"]