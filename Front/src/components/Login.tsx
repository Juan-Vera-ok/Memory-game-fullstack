import React, { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import axios from "axios";
import { toast } from "react-toastify";


interface Props {
    onLogin: () => void;
}

export function Login(props: Props) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        user: "",
        password: ""
    })

    const [userErr, setUserErr] = useState<boolean | null>(null)
    const [passwordErr, setPasswordErr] = useState<boolean | null>(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            data: {
                username: form.user,
                password: form.password
            },
        };

        try {
            const userIdResponse = await axios.post(BACKEND_URL+'/userAuth', config);     
            if (userIdResponse.data === 200) {
                let isAuth = true;
                props.onLogin();
                navigate("/");
            } else {
                if (userIdResponse.data === 301) {
                    toast.error("Usuario o contraseñas invalidas");
                    setForm({ user: "", password: "" })
                    setPasswordErr(null);
                    setUserErr(null);
                }
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    }


    const handleOnChange = (e) => {
        if (e.target.name === "user") {
            setForm(
                {
                    ...form,
                    user: e.target.value,
                }
            )
        }
        if (e.target.name === "password") {
            setForm(
                {
                    ...form,
                    password: e.target.value
                }
            )

        }

        let item = e.target
        if (item.name === 'user') {
            if (item.value.length < 6) {
                setUserErr(true)
            }
            else {
                setUserErr(false)
            }
        }
        if (item.name === 'password') {
            if (item.value.length < 10) {
                setPasswordErr(true)
            }
            else {
                setPasswordErr(false)
            }
        }

    }
    return (

        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center retro" id="login" >
            <form onSubmit={handleSubmit}>
                <div>
                    <fieldset>
                        <label>
                            Usuario
                            <input
                                style={{ width: 300 }}
                                name="user"
                                placeholder="Ingrese usuario"
                                type="text"
                                className={(userErr === null) ? "form-control" : (userErr ? "form-control is-invalid" : "form-control is-valid")}
                                value={form.user}
                                onChange={handleOnChange}></input>
                            {(userErr === null) ? "ㅤ" : (userErr ? <span className="invalid-feedback">
                                Mínimo 6 caracteres</span> : <span
                                    className="valid-feedback">6 caracteres ingresados 
                            </span>)}
                        </label>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <label>
                            Contraseña
                            <input
                                style={{ width: 300 }}
                                name="password"
                                placeholder="Ingrese contraseña"
                                type="password"
                                className={(passwordErr === null) ? "form-control" : (passwordErr ? "form-control is-invalid" : "form-control is-valid")}
                                value={form.password}
                                onChange={handleOnChange}>
                            </input>
                            {(passwordErr === null) ? "ㅤ" : (passwordErr ? <span
                                className="invalid-feedback">Mínimo 10 caracteres</span> : <span
                                    className="valid-feedback">10 caracteres ingresados</span>)}
                        </label>
                    </fieldset>
                </div>
                <div className="text-center"><button type="submit" className="btn btn-primary text-center" value="Submit">Submit</button></div>

            </form>
            <h6>¿No tenes cuenta? crea una cuenta haciendo <Link to="../sign-up">click acá</Link></h6>
        </div>
    )
}

