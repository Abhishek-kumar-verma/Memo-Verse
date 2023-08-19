import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signin = async(req,res) =>{
    const { email ,password} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if( !existingUser){
            return res.status(404).json({message : 'User does not found'});
        }
        const isPasswordMatch = await bcrypt.compare(password,existingUser?.password);
        if( !isPasswordMatch) {
            return res.status(400).json({message : 'Invalid Credentials'});
        }
        const token = jwt.sign({email:existingUser?.email , id:existingUser?._id}, process.env.SECRET_KEY ,{expiresIn:"1h"});
        return res.status(200).json({result : existingUser,token});
    }catch(error){
        return res.status(500).json({message : 'Invalid Credentials'});
    }
}

export const signup = async(req,res) =>{
    const { firstName, lastName , email ,password,confirmPassword } = req.body;
    try{
        const existingUser = await User.findOne({email});
        if( existingUser){
            return res.status(404).json({message : 'User Already Exists'});
        }
        
        if( password !== confirmPassword) {
            return res.status(400).json({message : 'Password does not match'});
        }
        const hashPassword = await bcrypt.hash(password,12);
        const result = await User.create({ email , password : hashPassword , name : `${firstName} ${lastName}`});
        const token = jwt.sign({email:result?.email , id:result?._id}, process.env.SECRET_KEY ,{expiresIn:"1h"});

        return res.status(200).json({result,token});
    }catch(error){
        return res.status(500).json({message : 'Something went wrong'});
    }
}