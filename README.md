# 🚀 Todo Microservice Project

A microservice-based Todo application demonstrating how multiple services can work together in a scalable, containerized architecture. Built with **Node.js**, **Express**, **MongoDB**, **PostgreSQL**, and **React**, orchestrated using **Nginx** and **Docker Compose**.

---

## 📁 Project Structure

```plaintext
api-gateway/       # Routes requests to backend services
task-service/      # Handles tasks using PostgreSQL
user-service/      # Handles users using MongoDB
frontend/          # React frontend (Vite)
nginx.conf         # Nginx load balancer configuration
docker-compose.yml # Docker setup for all services
README.md          # Project documentation

⚙️ Services Overview

This application consists of seven key services:

MongoDB 💾: Stores user data for the user-service.

PostgreSQL 🗄️: Stores task data for the task-service.

User Service 🧑‍💻: Node.js/Express API for managing users (/users).

Task Service ✅: Node.js/Express API for managing tasks (/tasks).

API Gateway 🚪: Central entry point that routes requests to backend services.

Frontend 🖥️: React (Vite) application served at http://localhost:3000.

Nginx ⚖️: Reverse proxy and load balancer accessible at http://localhost:8080.

✅ Requirements

Make sure the following are installed:

Docker

Docker Compose

Node.js & npm (optional for local development)

🚀 Setup & Run

1. Clone the Repository

git clone <your-repo-url>
cd TodoWithMicroservice

2. Start All Services

docker-compose up --build

This will:

Start MongoDB on port 27017

Start PostgreSQL on port 5432

Start backend services on ports 4000, 4001, 4002

Start the Frontend on port 3000

Start Nginx on port 8080

🌐 Access the Application

Frontend: http://localhost:3000

Via Nginx Gateway: http://localhost:8080 (Recommended for production-like environments)

🔍 Test APIs via Nginx

curl http://localhost:8080/tasks
curl http://localhost:8080/users

🔑 Environment Variables

Each service uses its own .env file for configuration:

user-service/.env

MONGO_URI=mongodb://mongodb:27017/usersdb
PORT=4000

task-service/.env

POSTGRES_HOST=postgres
POSTGRES_DB=tasksdb
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
PORT=4001

api-gateway/.env

JWT_SECRET=your_jwt_secret_key
USER_SERVICE_URL=http://user-service:4000
TASK_SERVICE_URL=http://task-service:4001
PORT=4002

frontend/.env

VITE_API_BASE_URL=http://localhost:8080

📬 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

📄 License

This project is licensed under the MIT License.