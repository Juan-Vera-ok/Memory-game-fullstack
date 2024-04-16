import config from "../config";
import jwt from "jsonwebtoken"
export const tokenSign = async(user:any)=>{

    return jwt.sign(
        {
            _id: user.id
        },
        config.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
}

export const verifyToken = async (token:string)=>{
    try {
        return jwt.verify(token,config.JWT_SECRET)
    } catch (error) {
        return null
    }
}

