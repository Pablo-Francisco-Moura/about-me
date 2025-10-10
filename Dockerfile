# Dockerfile multi-stage: dev e prod
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Dev stage
FROM base AS dev
COPY . .
EXPOSE 5175
CMD ["npm", "run", "dev", "--", "--host", "--port", "5175"]

# Build stage
FROM base AS build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5175
CMD ["nginx", "-g", "daemon off;"]
