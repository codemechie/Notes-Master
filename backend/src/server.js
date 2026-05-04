import express, { Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import notesRoutes from './routes/notesRoutes.js';
import connectDB from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

//get your config variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware:
app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(express.json());
app.use((req, res, next) => {
    console.log(`Req method: ${req.method}, URL: ${req.url}`);
    next();
});
app.use(rateLimiter);


//response:
app.use("/api/notes", notesRoutes);

//connect to DB and start server, in that order
connectDB().then(() => {
    app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
  });
});



