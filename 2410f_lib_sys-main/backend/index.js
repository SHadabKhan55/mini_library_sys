import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import express from "express"
import  dbconn  from "./config/dbconn.js"
import router from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
const app = express()
app.use( cors({ origin: "http://localhost:5173", credentials: true }) );
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",router)
dbconn()
const port = process.env.PORT 
app.listen(port,() => console.log(`server run on port ${port}`))
