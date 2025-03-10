FROM node:20
WORKDIR /cxzvue3
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.23.1-alpine
COPY --from=0 /cxzvue3/dist /usr/share/nginx/html
EXPOSE 3010
CMD ["nginx", "-g", "daemon off;"]