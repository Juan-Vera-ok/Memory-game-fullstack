import { RequestHandler } from "express";
import User from "./User";

import * as bcrypt from "bcryptjs";

export const createUser: RequestHandler = async (req,res) =>{
    
    try {
        const userFound = await User.findOne({user: req.body.user})
    if(userFound){
        return res.status(301).json({message:'El usuario ya existe'})
    }
    const {email,password,user} = req.body;
    console.log(password);
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
        let password= hash;
        const newUser = {email,password,user}
    const registerUser = new User(newUser)
    const savedUser = await registerUser.save()
    res.json(savedUser)
        });
        });
    
    
    } catch (error) {
        console.log(error)
    }
}

export const getUsers: RequestHandler = async (req,res) =>{
    try{
        const users = await User.find();
    res.json(users)
    }catch(error){
        res.json(error)
    }
}

export const getUser: RequestHandler = async (req,res) =>{
    const userFind = await User.findById(req.params.id)
    if(!userFind) { return res.status(204).json();}
    return res.json(userFind)
}

export const deleteUser: RequestHandler = async (req,res) =>{
    const userFound = await User.findByIdAndDelete(req.params.id);
    if(!userFound) { return res.status(204).json();}
    return res.json(userFound)
}

export const updateUser: RequestHandler = async (req,res) =>{
    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body,{new:true})
    res.json(userUpdated);
}