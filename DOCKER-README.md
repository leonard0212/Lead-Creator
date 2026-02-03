# Docker Setup Guide for LeadX

This guide explains how to run the LeadX application (both backend and frontend) in Docker containers.

## Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/) installed on your system
- (Optional) [Docker Compose](https://docs.docker.com/compose/) for easier multi-container management

---

## 1. Clone the Repository
```
git clone <your-repo-url>
cd LeadX
```

## 2. Create Dockerfiles

### Backend Dockerfile Example (`backend/Dockerfile`):
```Dockerfile
FROM php:8.2-apache
COPY . /var/www/html/
EXPOSE 80
```

### Frontend Dockerfile Example (`frontend/Dockerfile`):
```Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

## 3. Create a `docker-compose.yml` in the project root
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8080:80"
    volumes:
      - ./backend:/var/www/html
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
```

## 4. Build and Run the Containers
```
docker-compose up --build
```

- The backend will be available at [http://localhost:8080](http://localhost:8080)
- The frontend will be available at [http://localhost:3000](http://localhost:3000)

## 5. Stopping the Containers
```
docker-compose down
```

---

## Notes
- Adjust Dockerfiles as needed for your specific backend/frontend requirements.
- For database support, add a service (e.g., MySQL) to `docker-compose.yml`.
- For production, review security and environment variable management.

---

For more details, see the official Docker and Docker Compose documentation.