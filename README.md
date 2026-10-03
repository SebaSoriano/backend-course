# Backend Course API
source: https://www.youtube.com/watch?v=g09PoiCob4Y&t=128s

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
```

Getting Started
1. Clone the repository
```
git clone <repository-url>
cd backend-course
```
2. Install dependencies
```
npm install
```
3. Set up environment variables
Create a .env file in the root directory:
```
PORT=3000
DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:5432/<DATABASE_NAME>?schema=public"
JWT_SECRET="your_jwt_secret_key"
```
4. Run database migrations
Generate the Prisma client and apply database migrations:
```
npx prisma migrate dev
npx prisma generate
```
Running the Application
Development Mode

Runs the server using nodemon for auto-reloading:
```
npm run dev
# or
npx nodemon src/server.js
```
Production Mode
```
node src/server.js
```
API Endpoints
Authentication & Users
```
    POST /api/auth/register - Register a new user
    POST /api/auth/login - Authenticate user and receive JWT
```
Movies
```
    GET /api/movies - Fetch movies list
    POST /api/movies - Add a new movie (Protected)
    GET /api/movies/:id - Fetch single movie details
```
