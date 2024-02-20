import * as jose from 'jose'

export default async function loginHandler ({user,password}) {
const secret = new TextEncoder().encode(
    'Hola',
  )
  const alg = 'HS256'
 
    
    const payload = { user,password}
    const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret)

     const truePayload = { user:"tipazo",password:"1234567890"}
    const trueJwt = await new jose.SignJWT(truePayload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret)
if(JSON.stringify(jwt)===JSON.stringify(trueJwt)){
    window.localStorage.setItem("token",JSON.stringify(jwt))
    return true;
    }else{
return false
}
  
  


  
}