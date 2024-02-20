import React, {useState,useEffect} from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import axios from "axios";
import loginHandler from "../api/auth/login";




export function Login(props)
{
    const navigate = useNavigate();

const [form,setForm]=useState({
    user:null,
    password:null
})

const [userErr,setUserErr] = useState<boolean|null>(null)
const [passwordErr,setPasswordErr] = useState<boolean|null>(null)




const handleSubmit = async (e)=>{
    e.preventDefault()
   
    let isAuth=false
    isAuth = await loginHandler(form)
    
    if(isAuth===true){props.setUserAuth(true)}
    if(window.localStorage.getItem("token")){props.setUserAuth(true)}
    
   
    
    navigate("/")
}
        

    const handleOnChange = (e)=>{
        if(e.target.name==="user"){
            setForm(
            {
                ...form,
                 user : e.target.value,
            }
        )}
        if(e.target.name==="password"){
            setForm(
            {
                ...form,
                 password: e.target.value
            }
        )
        
    }
        
        let item = e.target
        if(item.name==='user'){
            if(item.value.length<6){
            setUserErr(true)}
            else{
                setUserErr(false)
            } 
        }
        if(item.name==='password'){
            if(item.value.length<10){
            setPasswordErr(true)}
            else{
                setPasswordErr(false)
            }
        }
        
        }
        return (
            
            <div  className="d-flex flex-column min-vh-100 justify-content-center align-items-center" id="login" >
                <form  onSubmit={handleSubmit}>
                    <div>
                    <fieldset>
                        <label> 
                            Usuario 
                            <input 
                            style={{width:300}}
                            name="user" 
                            placeholder="Ingrese nombre de usuario" 
                            type="text" 
                            className={(userErr===null)?"form-control":(userErr?"form-control is-invalid":"form-control is-valid")}  
                            onChange={handleOnChange}></input>
                            {(userErr===null)?"ㅤ":(userErr?<span className="invalid-feedback">
                                El usuario debe tener mínimo 6 caracteres</span>:<span 
                                className="valid-feedback">Cantidad de caracteres validos
                                </span>)}
                        </label>
                    </fieldset>
                    </div>
                    <div>
                        <fieldset>
                            <label> 
                            Contraseña
                            <input 
                            style={{width:300}}
                            name="password" 
                            placeholder="Ingrese contraseña" 
                            type="password" 
                            className={(passwordErr===null)?"form-control":(passwordErr?"form-control is-invalid": "form-control is-valid")} 
                            onChange={handleOnChange}>
                            </input>
                            {(passwordErr===null)?"ㅤ":(passwordErr?<span 
                            className="invalid-feedback">La contraseña debe tener mínimo 10 caracteres</span>:<span 
                            className="valid-feedback">Cantidad de caracteres validos</span>)}
                            </label>
                        </fieldset>
                    </div>
                    <div className="text-center"><button type="submit" className="btn btn-primary text-center" value="Submit">Submit</button></div>
                    
                </form>
                <h6>¿No tenes cuenta? crea una cuenta haciendo <Link  to="../sign-up">click acá</Link></h6>
            </div>
             )
    } 

    