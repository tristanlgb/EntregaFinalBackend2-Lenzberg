import express from 'express';
import { config } from './config/config.js';
import ordersRoutes from './routes/orders.routes.js';
import buyerRoutes from './routes/buyer.routes.js';
import businessRoutes from './routes/business.routes.js';
import DbConnection from './config/dbConnection.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/auth.config.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';
import { generateCustomResponses } from './utils/generateCustomResponses.js';
import productRoutes from "./routes/products.routes.js";



const app = express();
const PORT = config.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: config.CORS_ORIGIN || "http://localhost:8080",
    methods: config.CORS_METHODS || ["GET", "POST", "PUT", "DELETE"]
}));

app.use(passport.initialize());
initializePassport();
app.use(generateCustomResponses);

app.use('/api/orders', ordersRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/auth', authRoutes);
app.use("/api", productRoutes);

DbConnection.getInstance();
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
}).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use. Trying another port...`);
        setTimeout(() => {
            app.listen(PORT + 1, () => console.log(`✅ Server running on port ${PORT + 1}`));
        }, 1000);
    } else {
        console.error("❌ Server error:", err);
    }
});
