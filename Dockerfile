
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

ENV NEXT_PUBLIC_MONGODB_URI "mongodb://mongo:27017/examplegraphqldb"

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]


# # ************************************
# FROM node:16 AS build

# WORKDIR /app

# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install

# COPY . ./
# RUN npm run build

# # Etapa de producción
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# Etapa de construcción
# FROM node:18 AS builder

# WORKDIR /app

# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install

# COPY . ./
# RUN npm run build

# # Etapa de producción
# FROM node:18-alpine

# WORKDIR /app
# COPY --from=builder /app ./

# EXPOSE 3090
# CMD ["npm", "start"]


#************************


