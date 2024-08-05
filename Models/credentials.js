import mongoose from "mongoose";

const details=mongoose.Schema({
  username:String,
  email:String,
  password:String,
  resettoken:String
})

const credentials=mongoose.model("credentials",details);
export default credentials;