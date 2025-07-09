import mongoose from "mongoose";

const userSchema = new mongoose.Schema({  //creating the schema for the user .
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },

}, { minimize: false }); //{ minimize: false }: This option ensures that empty objects in cartData will still be saved as {} in MongoDB, rather than being minimized and omitted.

const userModel = mongoose.models.user || mongoose.model("user", userSchema); //creating the userModel

export default userModel;