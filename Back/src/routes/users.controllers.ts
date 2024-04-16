import { RequestHandler } from "express";
import User from "./User";

import bcryptNow from "../helpers/handleBcrypt";
import { compare } from "bcryptjs";
import { token } from "morgan";
import { tokenSign,verifyToken } from "../helpers/generateToken";
import mongoose from "mongoose";

export const createUser: RequestHandler = async (req, res) => {

    try {
        const userFound = await User.findOne({ user: req.body.user })
        if (userFound) {
            return res.status(301).json({ message: 'El usuario ya existe' })
        }
        const { email, password, user } = req.body;
        const passwordHashed = bcryptNow.encrypt(password);
        const newUser = { email, passwordHashed, user }
        const registerUser = new User(newUser)
        const savedUser = await registerUser.save()
        res.json(savedUser)




    } catch (error) {
        console.log(error)
    }
}

export const getUsers: RequestHandler = async (req, res) => {
    try {
        const users = await User.find();
        const sortedUsers = users.sort((a,b)=>{
            return (a.highScore||0)-(b.highScore||0);
        })
        res.json(sortedUsers)
    } catch (error) {
        res.json(error)
    }
}
export const auth: RequestHandler = async (req, res) => {
    try {

        console.log(req.body.data)
        const userFound = await User.findOne({ user: req.body.data.username })
        console.log("XDDDD" + userFound);
        if (userFound) {
            const correctPassword = await bcryptNow.compare(req.body.data.password, userFound?.passwordHashed)

            if (correctPassword) {
                const tokenSession = await tokenSign(userFound)
                res.cookie("token", tokenSession)

                res.json(200)
            }

        }
        if (!userFound) {
            console.log("SSSSSSSSSSSSSSSSSSS")
            res.json(301)
        }


    } catch (error) {
        console.log(error)
    }
}

export const deleteUser: RequestHandler = async (req, res) => {
    const userFound = await User.findByIdAndDelete(req.params.id);
    if (!userFound) { return res.status(204).json(); }
    return res.json(userFound)
}

export const updateUser: RequestHandler = async (req, res) => {
    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(userUpdated);
}

export const updateHighScore:RequestHandler= async (req,res)=>{
    debugger
    const userId= verifyToken(req.cookies.token)
    
    const user= await User.findById(userId);
    if(!user){throw new Error}
    if(!user.highScore){
        user.highScore = req.body.data;
        await User.updateOne(user.id,user)
        return res.json(user)
    }
    if(req.body.data>user.highScore){
        await User.updateOne(user.id,user)
        return res.json(user)
    }
}