import express, { Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from 'url';

import notesRoutes from './routes/notesRoutes.js';
import connectDB from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

//get your config variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Properly construct __dirname inside ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware(only for use in development):
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}

app.use(express.json());
app.use((req, res, next) => {
    console.log(`Req method: ${req.method}, URL: ${req.url}`);
    next();
});
app.use(rateLimiter);


//response:
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
    // Calculate the path properly based on the location of this file
    const frontendPath = path.join(__dirname, "../../frontend/dist");
    app.use(express.static(frontendPath));
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

//connect to DB and start server, in that order
connectDB().then(() => {
    app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
  });
});



