import express from "express"
import "dotenv/config"
import connectDB from "./config/db.js"
import registerRoutes from "./routes/index.js"
const app=express()

await connectDB()

app.use(express.json())

registerRoutes(app)

app.get('/',(req,res)=>res.send("Api Working"))

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Server is running on PORT:",PORT)
})