# A-Tech Systems Backend

This is the backend API server for A-Tech Systems, built with Express.js, TypeScript, and PostgreSQL.

## Features

- RESTful API endpoints
- JWT-based authentication
- Role-based access control
- PostgreSQL database with Prisma ORM
- Email notifications
- Input validation with Zod
- TypeScript for type safety

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## Setup

1. Clone the repository and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://your_username:your_password@localhost:5432/atech_db"
   PORT=5000
   JWT_SECRET="your-jwt-secret-key"
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASSWORD="your-app-specific-password"
   FRONTEND_URL="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

## Development

Start the development server:
```bash
npm run dev
```

The server will run on http://localhost:5000 by default.

## API Documentation

### Authentication
- POST `/api/auth/login` - User login

### Categories
- GET `/api/categories` - List all categories
- POST `/api/categories` - Create a category (Admin only)
- PUT `/api/categories/:id` - Update a category (Admin only)
- DELETE `/api/categories/:id` - Delete a category (Admin only)

### News
- GET `/api/news` - List all news
- POST `/api/news` - Create a news item (Admin only)
- PUT `/api/news/:id` - Update a news item (Admin only)
- DELETE `/api/news/:id` - Delete a news item (Admin only)

### Contact
- POST `/api/contact` - Submit a contact form
- GET `/api/messages` - List all messages (Admin only)
- PUT `/api/messages/:id/read` - Mark message as read (Admin only)
- DELETE `/api/messages/:id` - Delete a message (Admin only)

## Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
``` 