import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import {v2 as cloudinary} from "cloudinary"

import connectDB from "./db/dbconnect.js"


//importing routes
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import notificationRoutes from "./routes/notification.route.js"

const app = express()

dotenv.config(
    {
        path:".env"
    }
)

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const PORT = process.env.PORT || 5000



app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/post", postRoutes)
app.use("/api/v1/notification",notificationRoutes)


// console.log(`${process.env.MONGODB_URI}`)
app.listen(5000,()=>{
    console.log(`server is listening to ${PORT}`) 
    connectDB();
})

export default app;