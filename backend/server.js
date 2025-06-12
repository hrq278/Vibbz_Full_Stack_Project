import express from "express"
import dotenv, { configDotenv } from "dotenv"

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


app.listen(5000,()=>{
    console.log(`server is listening to ${PORT}`) 
})