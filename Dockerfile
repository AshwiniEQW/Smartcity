FROM node:14-alpine AS node 
WORKDIR /app
COPY . . 
RUN npm install
RUN npm run build --prod




FROM nginx:1.20-alpine
COPY --from=node /app/dist/SmartCityWebApp  /usr/share/nginx/html
#EXPOSE 3999
