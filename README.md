<div align="center">

# 🔮 MuMorrow — Backend API

**REST API for the MuMorrow temple discovery and digital fortune-stick platform.**

Built with Node.js, Express, Prisma, and MySQL.

**Individual Full-Stack Project**

[Frontend Application](https://github.com/JustBestDev/MuMorrow-Frontend)

</div>

---

## About MuMorrow

**MuMorrow** is a Thai temple discovery platform that combines temple information with digital spiritual experiences.

Users can discover temples, search and filter locations, save favorite temples, draw temple-specific digital fortune sticks (เซียมซี), and keep their fortune results as personal history.

This repository provides the **REST API and database layer** for the MuMorrow application.

---

## Key Features

### 🔐 Authentication

MuMorrow provides JWT-based user authentication with:

* User registration
* Login
* Current-user retrieval
* Profile editing
* Password hashing with bcrypt
* JWT-protected endpoints
* Role support (`USER`, `ADMIN`)

Passwords are hashed before being stored in the database.

### 🛕 Temple Management & Discovery API

The API provides temple data including:

* Temple name
* Description
* Province
* Address
* Geographic coordinates
* Image
* Categories
* Favorite statistics

Temple discovery supports:

* Text search
* Province filtering
* Category filtering
* Popular temple ranking

### 🔮 Digital Fortune-Stick System

Each temple can have its own collection of fortune sticks.

An authenticated user can draw a fortune from a selected temple.

The backend:

1. Identifies the requested temple.
2. Selects a temple fortune stick.
3. Creates a personal fortune-history record.
4. Stores a snapshot of the prediction.
5. Returns the result to the frontend.

The snapshot ensures historical results remain consistent even if the original fortune-stick content is edited later.

### 📜 Fortune History

Authenticated users can:

* Retrieve their complete fortune history
* Retrieve an individual historical result

Each history record connects:

```text
User
  │
  ├── Temple
  │
  └── Fortune Stick
```

and stores the prediction snapshot shown at the time of the draw.

### ❤️ Favorite Temples

Users can:

* Add a temple to favorites
* Remove a temple from favorites
* Retrieve their saved temples

The database uses a composite user/temple relationship to prevent duplicate favorites.

### ⭐ Temple Reviews

The backend includes a review system where authenticated users can:

* Create a temple review
* Update their own review
* Delete their own review

Public users can retrieve reviews for a temple.

Each review contains:

* Rating from `1–5`
* Comment
* Author
* Temple
* Created and updated timestamps

A user can have only one review per temple.

### 🏷️ Temple Categories

Temples support many-to-many categories through a join model.

Categories can be retrieved through the public API and used by the frontend for temple filtering.

---

## API Endpoints

The current API mounts its resources directly from the server root.

### Authentication

| Method  | Endpoint         | Authentication | Description            |
| ------- | ---------------- | -------------- | ---------------------- |
| `POST`  | `/auth/register` | Public         | Register a new account |
| `POST`  | `/auth/login`    | Public         | Login and receive JWT  |
| `POST`  | `/auth/logout`   | Required       | Logout endpoint        |
| `GET`   | `/auth/me`       | Required       | Get current user       |
| `PATCH` | `/auth/me`       | Required       | Update profile         |

### Temples

| Method | Endpoint                     | Authentication | Description              |
| ------ | ---------------------------- | -------------- | ------------------------ |
| `GET`  | `/temples`                   | Public         | Retrieve temples         |
| `GET`  | `/temples/popular`           | Public         | Retrieve popular temples |
| `GET`  | `/temples/:templeId`         | Public         | Retrieve temple details  |
| `POST` | `/temples/:templeId/fortune` | Required       | Draw a fortune stick     |

`GET /temples` supports query parameters:

```text
search
province
category
```

Example:

```http
GET /temples?search=พระแก้ว&province=กรุงเทพมหานคร&category=เสริมดวง
```

### Favorites

| Method   | Endpoint                      | Authentication | Description                     |
| -------- | ----------------------------- | -------------- | ------------------------------- |
| `GET`    | `/favorites`                  | Required       | Get the user's favorite temples |
| `POST`   | `/temples/:templeId/favorite` | Required       | Add temple to favorites         |
| `DELETE` | `/temples/:templeId/favorite` | Required       | Remove temple from favorites    |

### Fortune History

| Method | Endpoint                        | Authentication | Description                   |
| ------ | ------------------------------- | -------------- | ----------------------------- |
| `GET`  | `/fortune-histories`            | Required       | Get user's fortune history    |
| `GET`  | `/fortune-histories/:historyId` | Required       | Get individual history result |

### Reviews

| Method   | Endpoint                     | Authentication | Description            |
| -------- | ---------------------------- | -------------- | ---------------------- |
| `GET`    | `/temples/:templeId/reviews` | Public         | Get temple reviews     |
| `POST`   | `/temples/:templeId/reviews` | Required       | Create a temple review |
| `PATCH`  | `/reviews/:reviewId`         | Required       | Update own review      |
| `DELETE` | `/reviews/:reviewId`         | Required       | Delete own review      |

Review rating must be an integer between:

```text
1 – 5
```

### Categories

| Method | Endpoint      | Authentication | Description                |
| ------ | ------------- | -------------- | -------------------------- |
| `GET`  | `/categories` | Public         | Retrieve temple categories |

---

## Current Development Note

A route namespace for daily horoscopes currently exists:

```text
/daily-horoscopes
```

and the database contains the `DailyHoroscope` model.

However, the current `/daily-horoscopes/today` route does not yet have an active controller handler, so this functionality is considered **in development** rather than a completed public API feature.

---

## Database Schema

MuMorrow uses **Prisma ORM** with a MySQL-compatible database.

### Main Models

```text
User
Temple
Category
TempleCategory
FortuneStick
FortuneHistory
Favorite
Review
DailyHoroscope
```

### Relationship Overview

```text
User
 ├── FortuneHistory ── FortuneStick
 │         │
 │         └────────── Temple
 │
 ├── Favorite ──────── Temple
 │
 └── Review ────────── Temple


Temple
 ├── TempleCategory ── Category
 ├── FortuneStick
 ├── FortuneHistory
 ├── Favorite
 └── Review
```

### Important Constraints

The schema includes database-level constraints such as:

```text
User.email                     UNIQUE
Temple.name                    UNIQUE

TempleCategory                 UNIQUE (templeId, categoryId)
FortuneStick                   UNIQUE (templeId, stickNumber)
Favorite                       UNIQUE (userId, templeId)
Review                         UNIQUE (userId, templeId)

DailyHoroscope                 UNIQUE (horoscopeDate, birthDay)
```

These constraints help preserve consistency in user favorites, reviews, fortune sticks, categories, and horoscope data.

---

## Backend Architecture

```text
MuMorrow-Backend-API/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.js
│
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── categories.controller.js
│   │   ├── favorite.controller.js
│   │   ├── fortuneHistory.controller.js
│   │   ├── review.controller.js
│   │   └── temple.controller.js
│   │
│   ├── lib/
│   │
│   ├── middlewares/
│   │
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── categories.route.js
│   │   ├── daily.horoscopes.route.js
│   │   ├── favorites.route.js
│   │   ├── fortuneHistory.route.js
│   │   ├── reviews.route.js
│   │   └── temples.route.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── category.service.js
│   │   ├── favorite.service.js
│   │   ├── fortuneHistory.service.js
│   │   ├── review.service.js
│   │   └── temple.service.js
│   │
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── package.json
├── prisma.config.ts
└── README.md
```

---

## Request Flow

The backend separates HTTP handling from database operations.

```text
Client Request
      │
      ▼
    Route
      │
      ▼
 Middleware
      │
      ▼
 Controller
      │
      ▼
   Service
      │
      ▼
 Prisma ORM
      │
      ▼
    MySQL
```

This keeps routing, request handling, business logic, and database queries separated.

---

## Tech Stack

### Server

* **Node.js**
* **Express 5**
* **JavaScript — ES Modules**

### Database

* **Prisma ORM 7**
* **MySQL / MariaDB-compatible database**
* **@prisma/adapter-mariadb**

### Authentication & Security

* **JSON Web Token**
* **bcrypt**
* **CORS**

### Validation & Configuration

* **Zod**
* **dotenv**

---

## Authentication

Authenticated endpoints expect a JWT in the request header.

```http
Authorization: Bearer <token>
```

### Authentication Flow

```text
Email + Password
      │
      ▼
Find User
      │
      ▼
bcrypt Password Verification
      │
      ▼
Generate JWT
      │
      ▼
Return User + Token
      │
      ▼
Protected Requests
```

---

## Getting Started

### Prerequisites

Install:

* Node.js
* npm
* MySQL or MariaDB

### Clone Repository

```bash
git clone https://github.com/JustBestDev/MuMorrow-Backend-API.git
cd MuMorrow-Backend-API
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/mumorrow"
JWT_SECRET="your-secret-key"
PORT=8899
```

Do not commit your real `.env` file or secrets to the repository.

---

## Prisma Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Run database migrations when required:

```bash
npx prisma migrate dev
```

Seed development data:

```bash
npx prisma db seed
```

Inspect database data:

```bash
npx prisma studio
```

The repository includes a dedicated `prisma/seed.js` file for populating development data.

---

## Run Development Server

```bash
npm run dev
```

The current frontend Axios configuration expects the backend at:

```text
http://localhost:8899
```

So a typical `.env` configuration is:

```env
PORT=8899
```

---

## CORS

During local development, the API currently accepts the frontend origin:

```text
http://localhost:5173
```

Allowed methods include:

```text
GET
POST
PUT
PATCH
DELETE
```

---

## Error Handling

The Express application includes centralized handling for:

* Unknown routes
* Application errors

through:

```text
pathNotFound middleware
        │
        ▼
central error handler
```

---

## Related Repository

The React client is maintained separately:

**Frontend Application:**
https://github.com/JustBestDev/MuMorrow-Frontend

---

## Project Purpose

MuMorrow was developed as an **individual full-stack project** to demonstrate:

* REST API design
* Relational database modeling
* Authentication and authorization
* Password security
* Prisma ORM
* Service/controller architecture
* Many-to-many relationships
* Composite database constraints
* Search and filtering
* Personalized user data
* Frontend/backend integration
* End-to-end full-stack application development

---

## Author

**Takdanai (Best)**

Computer Engineering graduate
Full-Stack JavaScript Developer

GitHub: https://github.com/JustBestDev
