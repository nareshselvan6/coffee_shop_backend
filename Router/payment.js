import express from "express";
import { payment } from "../Controller/Payment.js";

const paymentrouter=express.Router();

paymentrouter.post("/stripepayment",payment)


export default paymentrouter