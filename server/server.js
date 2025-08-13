import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Import route modules
import menuRoutes from './routes/menuRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import prepaidServiceRoutes from './routes/prepaidServiceRoutes.js';
import loungeRoutes from './routes/loungeRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import prepaidRoutes from './routes/prepaidRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import auth from './routes/auth.js';
import cartRoutes from "./routes/cartRoutes.js";
import Payment from "./routes/payment.js";
import Webhook from "./routes/webhook.js";


dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Route mounting
app.use('/api/menus', menuRoutes);
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/prepaid', prepaidRoutes); 
app.use('/api/prepaid_services', prepaidServiceRoutes);
app.use('/api/lounges', loungeRoutes); 
app.use('/api/feedback', feedbackRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/auth', auth);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", Payment);
app.use("/api/webhook", Webhook);

app.listen(5000, () => console.log('Server running on port 5000'));
