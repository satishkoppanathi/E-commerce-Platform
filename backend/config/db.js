import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://koppanathisatish:satish1234@cluster0.323afoy.mongodb.net/food-del')
    .then(()=>console.log("DB connected"));
}