import credentials from "../Models/credentials.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { transporter } from "../Services/nodemailer.js";

dotenv.config();

export const register=async(req,res)=>{
try {
    const {username,email,password}=req.body;
    
    const pswd=await bcrypt.hash(password,10);
    console.log(pswd);
    
    const register=await credentials.create({
        username:username,
        email:email,
         password:pswd
    })
    
    res.status(200).json({register})
    
} catch (error) {
    console.log(error);
    
}
}


export const login = async(req,res)=>{
    try {
        const {email,password}=req.body;
        
        const loginuser=await credentials.findOne({email});

        if(!loginuser){
            return res.status(401).send("invalid email");
        }

        const pswrd = await bcrypt.compare(password,loginuser.password);

        if(!pswrd){
            return res.status(401).send("invalid password");
        }
        
        res.status(200).json({loginuser})

    } catch (error) {
        console.log(error);
        
        
    }
}

//forget password

export const forgetpassword=async (req,res)=>{
    const {email}=req.body;

    const user = await credentials.findOne({email});

    if(!user){
        return res.status(404).json({message:"User not found"})
      }
// token gen, 
 const tokengen = Math.floor(Math.random(10)*1000)

 // put token db add

const mail={email:user.email};
const token={resettoken:tokengen}

const assigntoken = await credentials.findOneAndUpdate(mail,token);
console.log(assigntoken);
console.log(process.env.PASS_EMAIL);


// link gen,

const generatedlink=`https://coffee-shop-frontend-vert.vercel.app/resetpswrd/${user.id}/${tokengen}`



//mail send

const info = await transporter.sendMail({
          from: process.env.PASS_EMAIL,
          to: user.email, 
          subject: "Password Reset", 
          text: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
           generatedlink
        });

        res.status(200).send("mail send successfully")

}


  


// hash function

const hashedpswd=async(password)=>{
    
    return await bcrypt.hash(password,15);
  
}

//reset password

export const resetpswd=async(req,res)=>{
 
  try {
    const {password}=req.body;  
    console.log(password); 

    const{id,token}=req.params;

    const resetuserpassword=await credentials.findOne({_id:id,resettoken:token});

   
    const hash= await hashedpswd(password)

const newpassword= await credentials.findOneAndUpdate(resetuserpassword,{password:hash,resettoken:" "});


    res.status(200).json("Password changed successfully")
    
  } catch (error) {
   
    res.status(500).send("error ocured while reseting password")
  }

}