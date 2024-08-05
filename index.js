import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import ConnectDB from "./Database/config.js";
import loginrouter from "./Router/Login.js";
import foodrouter from "./Router/route.js";

const app =express();
app.use(express.json());
app.use(cors());

dotenv.config();

//DB connection
ConnectDB()

//Routes
app.use("/auth",loginrouter)
app.use("/fooditem",foodrouter)

app.get('/',(req,res)=>{
    res.status(200).send("api connection done");
})

// PORT Access
app.listen(process.env.PORT,()=>{
    console.log("app running sucessfully");
})


