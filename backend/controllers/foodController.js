// we are creating a controller function to add food item
import foodModel from "../models/foodModel.js";
import fs from 'fs';// fs is file system which is pre-built in the nodejs


// add food item

const addFood = async (req,res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    });
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }


}

// add all food list
const listFood = async(req,res) => {
    try{
        const foods = await foodModel.find({});  //using this we fetch the all athe data
        res.json({success:true,data:foods})
    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

// remove food item by id
const removeFood = async(req,res) => {
    try{
        const food = await foodModel.findByIdAndDelete(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})

    } catch (error) {
        console.log(error);
        res.json({succes:false,message:"Error"})
    }
}

export {addFood,listFood,removeFood}