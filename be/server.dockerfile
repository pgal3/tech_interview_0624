# --------------------------
# Build stage
# --------------------------
FROM node:20 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npx prisma generate --schema src/infra/db/prisma/schema.prisma
RUN npm prune --production

# --------------------------
# Production stage
# --------------------------
FROM node:20-alpine 

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules/
COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /usr/src/app/dist ./dist/
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/src/infra/db/prisma/schema.prisma .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]