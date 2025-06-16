import express, { urlencoded } from "express"
import dotenv from "dotenv"
import connectDB from "./db/dbconnect.js"
import authRoutes from "./routes/auth.routes.js"

const app = express()

dotenv.config(
    {
        path:".env"
    }
)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 5000


app.use("/api/v1/auth", authRoutes)

// console.log(`${process.env.MONGODB_URI}`)
app.listen(5000,()=>{
    console.log(`server is listening to ${PORT}`) 
    connectDB();
})

export default app;