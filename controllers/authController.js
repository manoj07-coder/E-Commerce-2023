import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import { errorHandler } from "../helpers/errorHandler.js";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'



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

export const loginController = async(req,res,next) =>{
    const {email,password} = req.body;
    try {
        const validUser = await userModel.findOne({email});
        if(!validUser){
            return next(errorHandler(404,'User not found'))
        }
        const validPassword = await comparePassword(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(401,'Wrong credentials'));
        }
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const {password:pass,...rest} = validUser._doc;
        res.cookie('access_token',token,{httpOnly:true})
        .status(200).json(rest);
        
    } catch (error) {
        next(error)
    }
}
