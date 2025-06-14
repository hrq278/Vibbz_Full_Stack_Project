import express from "express"
import dotenv, { configDotenv } from "dotenv"
import connectDB from "./db/dbconnect.js"
import { Router } from "express"

const app = express()

configDotenv(
    {
        path:".env"
    }
)



const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("Server is ready");
});

console.log(`${process.env.MONGODB_URI}`)
app.listen(5000,()=>{
    console.log(`server is listening to ${PORT}`) 
    connectDB();
})