import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    user:{type: String,required: true,  trime: true,unique:true},
    email:{type: String,required: true,  trime: true,unique:true},
    passwordHashed:{type: String,required: true,  trime: true},
    highScore:{type:Number , required:false}
},{
    versionKey:false,
    timestamps:true,
})

export default model ('User',userSchema);