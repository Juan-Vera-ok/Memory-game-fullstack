import * as bcrypt from "bcryptjs"

const encrypt = async (textplain:string)=>{
    
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(textplain, salt, function(err, hash) {
        console.log();
    });
});

}
    


const compare = async(passwordPlain:any,hashPassword:any)=>{
    return await bcrypt.compare(passwordPlain,hashPassword)
}

const bcryptNow={encrypt,compare}
export default bcryptNow