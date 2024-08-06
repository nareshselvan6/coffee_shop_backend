import express from "express";
import { forgetpassword, login, register, resetpswd } from "../Controller/Logindetails.js";


const loginrouter=express.Router();

loginrouter.post("/register",register);
loginrouter.put("/login",login);
loginrouter.put("/forgetpassword",forgetpassword); 
loginrouter.put("/resetpswd/:id/:token",resetpswd)



export default loginrouter;