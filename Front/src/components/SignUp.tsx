import { left, right } from "@popperjs/core";
import React, { useState } from "react"

export default function SignUp(){
    const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);
    const [signUp,setSignUp]=useState(
        {   email:'',
            emailVerification:'',
            user:'',
            userVerification:'',
            password:'',
            passwordVerification:''
        }
    )

    const [errors,setErrors] = useState<{
        emailError:null|boolean,
        emailVerificationError:null|boolean,
        emailDoNotMatch:null|boolean,
        userError:null|boolean,
        userVerificationError:null|boolean,
        userDoNotMatch:null|boolean,
        passwordError:null|boolean,
        passwordVerificationError:null|boolean,
        passwordDoNotMatch:null|boolean}>(
        {
            emailError:null,
            emailVerificationError:null,
            emailDoNotMatch:null,
            userError:null,
            userVerificationError:null,
            userDoNotMatch:null,
            passwordError:null,
            passwordVerificationError:null,
            passwordDoNotMatch:null
        }
    );


    function handleOnChange(e){
        let tempSignUp
        let tempErrors
        e.preventDefault()
        const {name,value}=e.target;
        switch(name){
            case 'email':
                
                 tempSignUp={...signUp,
                email:e.target.value};
                tempErrors = {...errors,
                    emailError: Regex.test(value)?false:true,
                    emailDoNotMatch: (tempSignUp.email===tempSignUp.emailVerification)?false:true,
                };
                if(tempSignUp.email===''){tempErrors.emailError=null,tempErrors.emailDoNotMatch=null}
                break;
            case 'emailVerification':
                tempSignUp = {...signUp,
                    emailVerification:e.target.value}
                
                tempErrors = {
                    ...errors,
                    emailVerificationError: Regex.test(value)?false:true,
                    emailDoNotMatch: (tempSignUp.email===tempSignUp.emailVerification)?false:true
                }
                if(tempSignUp.emailVerification===''){tempErrors.emailVerificationError=null,tempErrors.emailDoNotMatch=null}
                break;
            case 'user':
                tempSignUp = {...signUp,
                    user:e.target.value}
                
                tempErrors = {
                    ...errors,
                    userError: value.length>5?false:true,
                    userDoNotMatch: (tempSignUp.user===tempSignUp.userVerification)?false:true
                }
                if(tempSignUp.user===''){tempErrors.userError=null,tempErrors.userDoNotMatch=null}
                break;
            case 'userVerification':
                tempSignUp = {...signUp,
                    userVerification:e.target.value}
                
                tempErrors = {
                    ...errors,
                    userVerificationError: value.length>5?false:true,
                    userDoNotMatch: (tempSignUp.user===tempSignUp.userVerification)?false:true
                }
                if(tempSignUp.userVerification===''){tempErrors.userVerificationError=null,tempErrors.userDoNotMatch=null}
                break;
            case 'password':
                tempSignUp = {...signUp,
                    password:e.target.value}
                
                tempErrors = {
                    ...errors,
                    passwordError: value.length>9?false:true,
                    passwordDoNotMatch: (tempSignUp.password===tempSignUp.passwordVerification)?false:true
                }
                if(tempSignUp.password===''){tempErrors.passwordError=null,tempErrors.passwordDoNotMatch=null}
                break;
            case 'passwordVerification':
                tempSignUp = {...signUp,
                    passwordVerification:e.target.value}
                
                tempErrors = {
                    ...errors,
                    passwordVerificationError: value.length>9?false:true,
                    passwordDoNotMatch: (tempSignUp.password===tempSignUp.passwordVerification)?false:true
                }
                if(tempSignUp.passwordVerification===''){tempErrors.passwordVerificationError=null,tempErrors.passwordDoNotMatch=null}
                break;
        }
        setSignUp(tempSignUp);
        setErrors(tempErrors);
    }

    const printValue = (e)=>{
        e.preventDefault()
        console.log(signUp);
        console.log(errors);}

return  (
   <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <form onSubmit={printValue}>
            <div className="form-group">
                <fieldset>
                <label  className="form-label mt-4">E-mail</label>
                <input 
                name="email"
                type="email" 
                className={(errors.emailError===null)?"form-control":
                (errors.emailError?"form-control is-invalid":
                (errors.emailDoNotMatch?"form-control is-invalid":"form-control is-valid"))} 
                placeholder="Ingrese e-mail" 
                onChange={(e)=>{handleOnChange(e)}} 
                />
                <div style={{float:left}}>{errors.emailError===null?<small>ㅤ</small>:(errors.emailError?<small className="text-danger">El e-mail ingresado es invalido</small>:<small className="text-success">E-mail valido</small>)}</div>
                <div style={{float:right}}>{errors.emailDoNotMatch===null?<small>ㅤ</small>:(errors.emailDoNotMatch?<small className="text-danger ">Los e-mails no coinciden</small>:<small className="text-success">Los e-mails si coinciden</small>)}</div>
                
                </fieldset>
                <fieldset>
                <label className="form-label mt-4">E-mail confirmación</label>
                <input name="emailVerification"
                type="email" 
                className={(errors.emailVerificationError===null)?"form-control":
                (errors.emailVerificationError?"form-control is-invalid":
                (errors.emailDoNotMatch?"form-control is-invalid":"form-control is-valid"))} 
                placeholder="Confirme su e-mail" 
                onChange={(e)=>{handleOnChange(e)}} 
                />
                <div style={{float:left}}>{errors.emailVerificationError===null?<small>ㅤ</small>:(errors.emailVerificationError?<small className="text-danger">El e-mail ingresado es invalido</small>:<small className="text-success">E-mail valido</small>)}</div>
                <div style={{float:right}}>{errors.emailDoNotMatch===null?<small>ㅤ</small>:(errors.emailDoNotMatch?<small className="text-danger ">Los e-mails no coinciden</small>:<small className="text-success">Los e-mails si coinciden</small>)}</div>
                
                </fieldset>
                <fieldset>
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">Usuario</label>
                <input name="user"
                type="text" 
                className={(errors.userError===null)?"form-control":
                (errors.userError?"form-control is-invalid":
                (errors.userDoNotMatch?"form-control is-invalid":"form-control is-valid"))} 
                placeholder="Ingrese su nombre de usuario" 
                onChange={(e)=>{handleOnChange(e)}} 
                />
                <div style={{float:left}}>{errors.userError===null?<small>ㅤ</small>:(errors.userError?<small className="text-danger">Mínimo 6 caracteres</small>:<small className="text-success">Usuario valido</small>)}</div>
                <div style={{float:right}}>{errors.userDoNotMatch===null?<small>ㅤ</small>:(errors.userDoNotMatch?<small className="text-danger ">Los usuarios no coinciden</small>:<small className="text-success">Los usuarios si coinciden</small>)}</div>
               
                </fieldset>
                <fieldset>
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">Usuario confirmación</label>
                <input name="userVerification"
                type="text" 
                className={(errors.userVerificationError===null)?"form-control":
                (errors.userVerificationError?"form-control is-invalid":
                (errors.userDoNotMatch?"form-control is-invalid":"form-control is-valid"))} 
                placeholder="Confirme su nombre de usuario" 
                onChange={(e)=>{handleOnChange(e)}} 
                />
                <div style={{float:left}}>{errors.userVerificationError===null?<small>ㅤ</small>:(errors.userVerificationError?<small className="text-danger">Mínimo 6 caracteres</small>:<small className="text-success">Usuario valido</small>)}</div>
                <div style={{float:right}}>{errors.userDoNotMatch===null?<small>ㅤ</small>:(errors.userDoNotMatch?<small className="text-danger ">Los usuarios no coinciden</small>:<small className="text-success">Los usuarios si coinciden</small>)}</div>
               
                </fieldset>
                <fieldset>
                <label htmlFor="exampleInputPassword1" className="form-label mt-4">Contraseña</label>
                <input name="password"
                type="password" 
                className={(errors.passwordError===null)?"form-control":
                (errors.passwordError?"form-control is-invalid":
                (errors.passwordDoNotMatch?"form-control is-invalid":"form-control is-valid"))} 
                placeholder="Ingrese su contraseña" 
                onChange={(e)=>{handleOnChange(e)}} 
                />
                <div style={{float:left}}>{errors.passwordError===null?<small>ㅤ</small>:(errors.passwordError?<small className="text-danger">Mínimo 10 caracteres</small>:<small className="text-success">Contraseña valida</small>)}</div>
                <div style={{float:right}}>{errors.passwordDoNotMatch===null?<small>ㅤ</small>:(errors.passwordDoNotMatch?<small className="text-danger ">Las contraseñas no coinciden</small>:<small className="text-success">Las contraseñas si coinciden</small>)}</div>
                </fieldset>
                <fieldset>
                <label htmlFor="exampleInputPassword1" className="form-label mt-4">Confirmación de contraseña</label>
                <input name="passwordVerification"
                type="password" 
                className={(errors.passwordVerificationError===null)?"form-control":
                (errors.passwordVerificationError?"form-control is-invalid":
                (errors.passwordDoNotMatch?"form-control is-invalid":"form-control is-valid"))} 
                placeholder="Confirme su contraseña" 
                onChange={(e)=>{handleOnChange(e)}} 
                />
                <div style={{float:left}}>{errors.passwordVerificationError===null?<small>ㅤ</small>:(errors.passwordVerificationError?<small className="text-danger">Mínimo 10 caracteres</small>:<small className="text-success">Contraseña valida</small>)}</div>
                <div style={{float:right}}>{errors.passwordDoNotMatch===null?<small>ㅤ</small>:(errors.passwordDoNotMatch?<small className="text-danger ">Las contraseñas no coinciden</small>:<small className="text-success">Las contraseñas si coinciden</small>)}</div>
                </fieldset>
            </div>
            <fieldset className="form-group">
            Al hacer click en "Submit" está aceptando los terminos y condiciones
            </fieldset>
            <div className="text-center"><button type="submit" className= {Object.values(errors).every(value => value === false) ?"btn btn-primary text-center ":"btn btn-secondary text-center disabled"}>Submit</button></div>
        </form>
   </div>
  
        )
}