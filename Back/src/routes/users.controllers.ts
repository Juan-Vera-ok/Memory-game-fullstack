import { RequestHandler } from "express";
import User from "./User";

export const createUser: RequestHandler = async (req,res) =>{
    const userFound = await User.findOne({userName: req.body.userName})
    if(userFound){
        return res.status(301).json({message:'El usuario ya existe'})
    }
    const user = new User(req.body)
    const savedUser = await user.save()
    res.json(savedUser)
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