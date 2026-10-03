# backend-course
source: https://www.youtube.com/watch?v=g09PoiCob4Y&t=128s

# Backend Course API

RESTful API built with Node.js, Express, Prisma ORM, PostgreSQL, and JWT authentication.

## Technologies Used

- **Node.js**: `v26.10.0`
- **Express**: Web framework for routes and middleware
- **Prisma ORM**: `v6.19.3` for database modeling and queries
- **PostgreSQL**: Relational database
- **JSON Web Tokens (JWT)**: User authentication & authorization
- **Nodemon**: Development live-reload

---

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (`v26.10.0` or higher)
- [PostgreSQL](https://www.postgresql.org/) database server
- [npm](https://www.npmjs.com/)

---

## Project Structure

```text
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── migrations/            # Database migration history
├── src/
│   ├── config/                # Database and app configurations
│   ├── routes/                # API routes (e.g., movie routes)
│   └── server.js              # Application entry point
├── .env                       # Environment variables (ignored by git)
└── package.json
