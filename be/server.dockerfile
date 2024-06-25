FROM node:20 as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-slim

ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci

COPY --from=builder /usr/src/app/dist ./dist

RUN npx prisma generate

ENTRYPOINT [ "node", "dist/main.js" ]
