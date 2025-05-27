import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth';
import { categoriesRouter } from './routes/categories';
import { newsRouter } from './routes/news';
import { contactRouter } from './routes/contact';
import { messagesRouter } from './routes/messages';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/news', newsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/messages', messagesRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 