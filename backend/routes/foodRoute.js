import express from "express"
import { addFood,listFood,removeFood } from "../controllers/foodController.js"
import multer from "multer" //using this create image storage system

//creating express router
const foodRouter = express.Router();

// Image storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,File,cb)=>{
        return cb(null,`${Date.now()}${File.originalname}`);
    }
})
//middleware
const upload = multer({storage:storage})

//uploading middleware in route
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)


export default foodRouter;