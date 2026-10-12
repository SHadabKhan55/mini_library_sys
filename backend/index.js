import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import express from "express"
import  dbconn  from "./config/dbconn.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import librarianRouter from "./routes/librarian.route.js"
const app = express()
app.use( cors({ origin: "http://localhost:5173", credentials: true }) );
app.use(cookieParser())
app.use(express.json())

// auth route
app.use("/api/auth",authRouter)
// librarian route
app.use("/api/librarian",librarianRouter)
dbconn()
const port = process.env.PORT 
app.listen(port,() => console.log(`server run on port ${port}`))
