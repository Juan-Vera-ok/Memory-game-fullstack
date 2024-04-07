
const jwt = require ('jsonwebtoken')

export const tokenSign = async(user:any)=>{
    return jwt.sign(
        {
            _id: user.id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
}

export const verifyToken = async (token:any)=>{
    try {
        return jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return null
    }
}

