# Dockerized Express Application

This project is a Node.js and Express API packaged as a Docker container. It provides a basic application endpoint and a dedicated health endpoint that can be used to check whether the service is running correctly.

The application uses GitHub Actions for continuous integration and deployment to Amazon ECS with the AWS Fargate launch type. Docker images are stored in Amazon Elastic Container Registry (ECR), and an Application Load Balancer (ALB) routes incoming traffic to the running ECS tasks.

## Deployment architecture

```text
GitHub repository
       |
       v
GitHub Actions
       |
       | Build and push Docker image
       v
   Amazon ECR
       |
       | Deploy image
       v
ECS Fargate service <--- Application Load Balancer <--- Internet
       |
       v
Express container (port 8000)
```

The deployment workflow performs the following steps:

1. Checks out the application source code.
2. Builds the Docker image.
3. Authenticates with AWS.
4. Pushes the image to Amazon ECR.
5. Creates a new ECS task definition revision using the image.
6. Updates the ECS Fargate service.
7. Waits for the ECS deployment to become stable.

The ALB target group forwards requests to container port `8000` and uses the `/health` endpoint to verify the health of each task.

## Project structure

```text
.
|-- README.md
`-- server
    |-- .dockerignore
    |-- Dockerfile
    |-- package.json
    |-- package-lock.json
    `-- server.js
```

## Run locally with Node.js

Requirements: Node.js and npm.

```bash
cd server
npm install
npm start
```

The API is available at <http://localhost:8000>.

## Run locally with Docker

From the repository root:

```bash
docker build -t ecs-cicd-app ./server
docker run --rm -p 8000:8000 ecs-cicd-app
```

Test the application:

```bash
curl http://localhost:8000/
curl http://localhost:8000/health
```

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/` | Confirms that the application is running |
| `GET` | `/health` | Health check for ECS or the ALB target group |
