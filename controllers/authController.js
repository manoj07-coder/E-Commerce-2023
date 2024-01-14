import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";


export const registerController = async(req,res,next)=>{
    const {name,email,password,phone,address} = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new userModel({name,email,phone,address,password:hashedPassword});
    try {
        await newUser.save();
        res.status(201).json('User created succesfully');
    } catch (error) {
        next(error)
    }
}
