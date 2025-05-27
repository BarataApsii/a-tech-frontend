# A-Tech Systems Frontend

This is the frontend web application for A-Tech Systems, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive design
- Server-side rendering with Next.js
- Type-safe development with TypeScript
- Styled with Tailwind CSS
- Authentication with JWT
- Admin dashboard
- News management
- Contact form

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API server running

## Setup

1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

## Development

Start the development server:
```bash
npm run dev
```

The application will run on http://localhost:3000 by default.

## Project Structure

```
frontend/
├── app/                  # App Router pages and layouts
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components
│   └── admin/           # Admin-specific components
├── lib/                 # Utility functions and configurations
├── public/             # Static assets
└── styles/             # Global styles and Tailwind config
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXTAUTH_URL` - NextAuth.js URL (usually your domain)
- `NEXTAUTH_SECRET` - Secret key for NextAuth.js

## Working with the Backend

The frontend communicates with the backend API server for:
- User authentication
- News management
- Category management
- Contact form submissions
- Admin operations

Make sure the backend server is running and accessible at the URL specified in `NEXT_PUBLIC_API_URL`.
