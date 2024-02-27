import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    userName:{type: String,required: true,  trime: true},
    email:{type: String,required: true,  trime: true},
    password:{type: String,required: true,  trime: true}
},{
    versionKey:false,
    timestamps:true,
})

export default model ('User',userSchema);