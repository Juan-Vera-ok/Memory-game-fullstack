import { RequestHandler } from "express";
import { verifyToken } from "../helpers/generateToken";

const checkAuth :RequestHandler= async (req,res,next)=>{
    if(!req.cookies){return next()}
    const token = req.cookies['token']
    const tokenData = await verifyToken(token);
    if(tokenData._id){
        return next();
    }else{
        res.status(409)
        res.send("Invalid token")
    }
}

export default checkAuth