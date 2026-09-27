import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/dbcon.js";
connectDB();
const app = express();



// Middlewares
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));





// Routes
import authRoutes from "./routes/auth.route.js";
// import userRoutes from "./routes/user.route.js";
// import bookRoutes from "./routes/book.route.js";

app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/books", bookRoutes);


// Server
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});