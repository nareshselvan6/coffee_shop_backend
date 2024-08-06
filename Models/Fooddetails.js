import mongoose from "mongoose";

const detailsSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  quantity:Number
});

const FoodDetails = mongoose.model("FoodDetails", detailsSchema);
export default FoodDetails;
