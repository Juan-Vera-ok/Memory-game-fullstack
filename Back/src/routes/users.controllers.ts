import { RequestHandler } from "express";
import User from "./User";

import bcryptNow from "../helpers/handleBcrypt";
import { compare } from "bcryptjs";
import { token } from "morgan";
import { tokenSign, verifyToken } from "../helpers/generateToken";
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
        const users = await User.find().sort([['highScore',-1]]).limit(5);
        const top = users.map((user)=>{return {user:user.user,highscore:user.highScore}})
        res.json(top)
    } catch (error) {
        res.json(error)
    }
}
export const auth: RequestHandler = async (req, res) => {
    const userFound = await User.findOne({ user: req.body.data.username });

    if (!userFound) return res.status(403);

    const correctPassword = await bcryptNow.compare(req.body.data.password, userFound?.passwordHashed)

    if (!correctPassword) return res.status(403);

    const token = await tokenSign(userFound);

    return res.status(200).json({ token });
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

export const updateHighScore: RequestHandler = async (req, res) => {
    const user = (req as any).user;
    if (!user) throw new Error("Missing user");
    if (!user.highScore || user.highScore < req.body.newUserHighScore) {
        await User.updateOne({ _id: user._id }, { $set: { 'highScore': req.body.newUserHighScore } })
        return res.json(user)
    }
}

export const highScoreOfCurrentUser: RequestHandler = async (req, res) => {
    const user = (req as any).user;
    if (!user) throw new Error("Missing user");
    res.json(user?.highScore)
}