# Build stage
FROM node:alpine3.18 as build


# Declare build-time environment variables (Vite style)
ARG VITE_NODE_ENV
ARG VITE_SERVER_BASE_URL

# Make them available during build
ENV VITE_NODE_ENV=$VITE_NODE_ENV
ENV VITE_SERVER_BASE_URL=$VITE_SERVER_BASE_URL

# Build App
WORKDIR /app
# Install dependencies
COPY package.json .
RUN npm install
# Copy project files
COPY . .
# Build Vite app (outputs to /dist)
RUN npm run build


# Production stage (Nginx)
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
# Clean default nginx files
RUN rm -rf *
# Copy Vite build output (IMPORTANT: /dist)
COPY --from=build /app/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]