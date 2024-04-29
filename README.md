Scaffold backend with:
- docker compose for development
- MongoDB
- Nest JS
- Hot Reload in development

## Prerequisites

To run the project you need to have docker and docker compose, see [Install Docker](https://docs.docker.com/engine/install/).

## How to run``

Run this command to start the backend in development mode with hot reload enabled:
```bash
docker compose up
```

Backend can be accessed at http://localhost:8080

Stop the backend with:
```bash
docker compose stop
```

To remove the containers and volumes run:
```bash
docker compose down -v
```

To run linter:
```bash
cd api
npm run lint
```

## How to rebuild when new packages are installed

When adding new npm packages you need to rebuild the docker image, you can do it with:
```bash
docker compose up --build
```

This will rebuild and run the containers.

## Folder Structure

- `api` NestJS backend
- `docker` Docker images for development