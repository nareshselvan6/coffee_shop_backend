import FoodDetails from "../Models/Fooddetails.js";

// Post

export const createfood=async(req,res)=>{
    try {        
        const {name,description,price}=req.body;
        console.log(price);  

        const createfood=new FoodDetails({name:name,description:description,price:price})
        await createfood.save();

        res.status(200).json({createfood})
    } catch (error) {
        console.log(error);
    }
}

// Get

export const getfood = async(req,res)=>{
    try {
        const getfood=await FoodDetails.find();

        res.status(200).json({getfood})
    } catch (error) {
        console.log(error);
    }
}

// Get by Id

export const getfoodid= async(req,res)=>{
    try {
        const id=req.params.id;
        console.log(id);
        const getfoodid=await FoodDetails.findOne({_id:id});

        res.status(200).json({getfoodid})


    } catch (error) {
        console.log(error);
    }

}

// Put

export const putfood= async(req,res)=>{
    try {
        const id=req.params.id;
        const {name,description,price}=req.body;
        console.log(id,name,description,price);
        

        const iddata=await FoodDetails.findOneAndUpdate({_id:id},{name:name,description:description,price:price})

        res.status(200).json({iddata})
        
    } catch (error) {
        console.log(error);

    }
}

// Delete

export const deletefood= async(req,res)=>{
    try {
        const id=req.params.id;
        console.log(id);

        const deletefood=await FoodDetails.findOneAndDelete({_id:id})

        
        res.status(200).send("deleted successfully")

    } catch (error) {
        console.log(error);
    }

}