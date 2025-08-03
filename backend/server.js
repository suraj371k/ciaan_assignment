import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

//routes
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'https://ciaan-assignment-xi.vercel.app',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//routes
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

//database connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
