import * as bcrypt from "bcryptjs"

const encrypt = (textplain:string)=>{
    
    var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(textplain, salt);
return hash;
}
    


const compare = async(passwordPlain:any,hashPassword:any)=>{
    return await bcrypt.compare(passwordPlain,hashPassword)
}

const bcryptNow={encrypt,compare}
export default bcryptNow