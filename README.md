# A-Tech Website

A modern website for A-Tech, a web design and development company, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive design
- Blog system
- Portfolio showcase
- Contact form
- Dark mode support
- SEO optimized
- Fast performance

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- PostgreSQL with Prisma
- React Hook Form
- Zod validation
- next-themes for dark mode

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd a-tech
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/atech"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/lib` - Utility functions and shared code
- `/prisma` - Database schema and migrations
- `/public` - Static assets

## Development

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Database Management

- `npx prisma studio` - Open Prisma Studio to manage data
- `npx prisma generate` - Generate Prisma Client
- `npx prisma db push` - Push schema changes to database

## Deployment

The site can be deployed to Vercel with zero configuration. Simply connect your repository and deploy.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
