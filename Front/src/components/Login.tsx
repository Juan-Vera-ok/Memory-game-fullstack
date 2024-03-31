import React, {useState,useEffect} from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import axios from "axios";
import loginHandler from "../api/auth/login";
import { toast } from "react-toastify";



export function Login(props)
{
    const navigate = useNavigate();

const [form,setForm]=useState({
    user:"",
    password:""
})

const [userErr,setUserErr] = useState<boolean|null>(null)
const [passwordErr,setPasswordErr] = useState<boolean|null>(null)




const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FORMULARIO" + form.user + form.password);
    const config = {
        data: {
            username: form.user,
            password: form.password
        },
    };

    console.log(config)
    try {
        console.log("TRY")
        const userIdResponse = await axios.post('http://localhost:3000/userAuth',config,{withCredentials:true});
        console.log("DDDDD"+userIdResponse);
        

        console.log("ssss"+userIdResponse);

        if (userIdResponse.data===200) {
            console.log("Loggeado");
            let isAuth= true;
            props.setUserAuth(isAuth);
            navigate("/");
        }else{
            if(userIdResponse.data===301){
            toast.error("Usuario o contraseñas invalidas");
        setForm({user:"",password:""})
        setPasswordErr(null);
        setUserErr(null);
    }
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
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
                            value={form.user}  
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
                            value={form.password}
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

    