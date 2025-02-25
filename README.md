# IJD Creative Task 🚀

![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![Redis](https://img.shields.io/badge/swagger-blue.svg?logo=swagger&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)

---

## 📚 Table of Contents

- [🌟 Features](#-features)
- [📖 API Documentation](#-api-documentation)
  - [📚 Swagger](#-swagger)
  - [🚀 Postman](#-postman)
- [🗄️ Database Schema](#️-database-schema)
- [🛠️ Getting Started](#️-getting-started)
  - [⚡ Prerequisites](#-prerequisites)
  - [📦 Installing](#-installing)

---

## 🌟Features

- 🔒 **Authentication & Authorization** (JWT).
- ✅ **CRUD** Operations for orders.

---

## 📖 API Documentation

### 📚 Swagger

Swagger UI is available at `/api-docs` route.

- **Local**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### 🚀 Postman

Easily test and interact with the API documentation using Postman

## [![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/10107969/2sAYdeMX8x#f2c30964-d740-45bd-934d-aa936e5e7458)

---

## 🗄️ Database Schema

![schema](https://github.com/user-attachments/assets/80e98393-41f6-4501-8c39-df12a93b690b)

---

## 🛠️ Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing.

### ⚡ Prerequisites

- 🟢 [Node.js](https://nodejs.org/en)
- 🐬 [MySQL](https://www.mysql.com/downloads/) using 🐳 [Docker](https://www.docker.com/) from [Docker Hub](https://hub.docker.com/_/mysql)
- 🌐 A web browser like [Google Chrome](https://www.google.com/intl/ar_eg/chrome/)
- 💻 A text editor (_recommended_: [Visual Studio Code](https://code.visualstudio.com/download))
- 🧪 API Testing Tool — [Postman](https://www.postman.com/downloads/)
- 🐘 Database Engine — [DBeaver](https://dbeaver.io/download/)

---

## 📦 Installing

1. **Clone the repository** 🔗:

   ```bash
   git clone https://github.com/MuhammedMagdyy/ijd-creatives-task.git
   ```

2. **Navigate to the project directory** 📁:

   ```bash
   cd ijd-creatives-task
   ```

3. **Install required packages** 📦:

   ```bash
   npm install
   ```

4. **Configure Environment Variables** 🛡️:

   - Rename `.env.example` ➔ `.env`
   - Add your environment variables based on [`.env.example`](https://github.com/MuhammedMagdyy/ijd-creatives-task/blob/main/.env.example)

5. **Run Database Migrations** 🗄️:

   ```bash
   npm run db:migrate
   npm run db:generate
   npm run db:push
   ```

6. **Start the Application** ⚡:
   - **Production** 🏆: `npm start`
   - **Development** 🧑‍💻: `npm run dev`

---

🚀 **Happy Coding!**
