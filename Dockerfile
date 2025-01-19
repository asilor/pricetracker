FROM node:alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./

FROM base AS prod-deps
RUN npm install --omit=dev

FROM base AS build-deps
RUN npm install

FROM build-deps AS build
COPY . .

ARG VITE_MONGO_USER=${VITE_MONGO_USER}
ARG VITE_MONGO_PASSWORD=${VITE_MONGO_PASSWORD}
ARG VITE_MONGO_IP=${VITE_MONGO_IP}
ARG VITE_MONGO_PORT=${VITE_MONGO_PORT}
ARG VITE_MONGO_DB_NAME=${VITE_MONGO_DB_NAME}

RUN npm run build

FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build

ENV NODE_ENV=production PORT=3000

EXPOSE 3000

CMD ["node", "./build/index.js"]