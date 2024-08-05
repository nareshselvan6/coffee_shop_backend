import express from "express";
import { createfood, deletefood, getfood, getfoodid, putfood } from "../Controller/Food.js";

const foodrouter =express.Router();

foodrouter.post("/createfood",createfood);
foodrouter.get("/getfood",getfood);
foodrouter.get("/getfoodid/:id",getfoodid);
foodrouter.put("/putfood/:id",putfood);
foodrouter.delete("/deletefood/:id",deletefood);



export default foodrouter;