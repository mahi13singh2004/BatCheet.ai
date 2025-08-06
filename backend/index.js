import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import connectDB from "./db/connectDB.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()
const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRoutes)

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    connectDB()
    console.log(`Server Is Running On Port ${PORT}`)
})