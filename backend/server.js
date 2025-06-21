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
//dot env configuration
dotenv.config(
    {
        path:".env"
    }
)
//Cloudinary configuration

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET
})


//using middleware for the parsing the data through json and form
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//port configuration

const PORT = process.env.PORT || 5000


//Api Routes defined
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


//dependencies used for this project for my MERN project's backend
//  "bcryptjs": "^3.0.2",
//     "cloudinary": "^2.6.1",
//     "cookie-parser": "^1.4.7",
//     "cors": "^2.8.5",
//     "dotenv": "^16.5.0",
//     "express": "^5.1.0",
//     "jsonwebtoken": "^9.0.2",
//     "mongodb": "^6.17.0",
//     "mongoose": "^8.15.1