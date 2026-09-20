# MuMorrow — Backend API

REST API and backend service for **MuMorrow**, a full-stack web application developed as an individual project.

This repository handles server-side application logic, authentication, data validation, and database access for the MuMorrow frontend application.

## Tech Stack

* **Node.js**
* **Express 5**
* **JavaScript (ES Modules)**
* **Prisma ORM**
* **MariaDB**
* **JWT (JSON Web Token)**
* **bcrypt**
* **Zod**
* **CORS**
* **dotenv**

## Frontend Repository

The frontend application is maintained separately:

[MuMorrow Frontend](https://github.com/JustBestDev/MuMorrow-Frontend)

## Backend Responsibilities

The backend is responsible for:

* REST API endpoints
* Application business logic
* User authentication
* Password hashing with bcrypt
* JWT-based authorization
* Request and data validation
* Database access through Prisma ORM
* Communication with the frontend application

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MariaDB

### Installation

Clone the repository:

```bash
git clone https://github.com/JustBestDev/MuMorrow.git
cd MuMorrow
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
JWT_SECRET="your-jwt-secret"
PORT=8000
```

> Do not commit your real `.env` file or secret credentials to GitHub.

## Database Setup

Configure your database connection in `.env`, then initialize Prisma.

```bash
npx prisma generate
```

Run the database migration if migrations are included in the project:

```bash
npx prisma migrate dev
```

You can inspect your database using Prisma Studio:

```bash
npx prisma studio
```

## Run Development Server

```bash
npm run dev
```

The development script runs the server using Node.js watch mode.

## API Architecture

The backend follows a separated server-side architecture where responsibilities can be organized into layers such as:

```text
src/
├── controllers/
├── routes/
├── services/
├── middlewares/
├── validations/
├── utils/
└── server.js

prisma/
├── schema.prisma
└── migrations/
```

This separation helps keep routing, business logic, validation, and database access maintainable as the application grows.

## Authentication

MuMorrow uses token-based authentication.

The authentication flow is designed around:

1. User credentials are submitted to the API.
2. Passwords are verified using `bcrypt`.
3. The server generates a JSON Web Token.
4. Protected endpoints validate the token before allowing access.

Passwords should never be stored as plain text.

## Data Validation

The API uses **Zod** for validating incoming application data before it reaches the main business logic.

This helps keep API input predictable and reduces invalid data being persisted to the database.

## Database

Database operations are managed using **Prisma ORM** with a **MariaDB** database.

Prisma provides:

* Schema-based database modeling
* Type-safe database queries
* Database migrations
* Prisma Studio for inspecting development data

## Related Repository

| Application | Repository                                                   |
| ----------- | ------------------------------------------------------------ |
| Frontend    | [MuMorrow Frontend](https://github.com/JustBestDev/MuMorrow-Frontend) |
| Backend API | This repository                                              |

## Development Focus

This project was created to practice and demonstrate backend and full-stack development concepts, including:

* REST API design
* Authentication and authorization
* Password security
* Database modeling
* ORM-based database access
* Request validation
* Frontend/backend integration
* Environment-based configuration

## Author

**Takdanai (Best)**

Computer Engineering graduate and Full-Stack JavaScript developer.

GitHub: [JustBestDev](https://github.com/JustBestDev)

---

This project was developed as an **individual full-stack project**.
