import { Link, useNavigate } from "react-router-dom";
import "../estilos/login.css"
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function Login () {

    const navigate =  useNavigate();

    const [correo, setcorreo] = useState("");
    const [password, setpassword] = useState("");

    async function iniciarSesion (e) {
        e.preventDefault();

        try{
            const respuesta = await fetch(
                "http://localhost:3000/login",
                {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        correo: correo,
                        password: password,
                    })
                }
            );

            const data = await respuesta.json();

            localStorage.setItem(
                "token",
                data.token
            );

            const usuario = jwtDecode(data.token);

            console.log(usuario);

            alert(data.mensaje);
            
            if (usuario.rol ==="admin"){
                navigate("../inicio")
            } else {
                navigate("/")
            }

            setcorreo("")
            setpassword("")

        } catch (error ){
            console.log(error);
            alert("Error al iniciar sesion")
        }

        
    };


    return (
        <>
            <div className="pagina-login">
                <div>
                    <h1>iniciar sesion</h1>
                </div>

                <section className="formulario-sesion">
                        <form onSubmit={iniciarSesion}>
                            <input 
                                type="text"
                                placeholder="correo"
                                value ={correo}
                                onChange ={(e) =>
                                    setcorreo(e.target.value)
                                }
                            />
                            <input 
                                type="password"
                                placeholder="contraseña"
                                value={password}
                                onChange ={(e) =>
                                    setpassword(e.target.value)
                                }
                            />
                            <button type="submit" className="btn-sesion">
                                iniciar sesion
                            </button>
                            
                            <p className="texto-registro">
                                ¿No tienes una cuenta?
                            </p>

                            <Link
                                to="/registro"
                                className="link-registro"
                            >
                                Registrarse
                            </Link>
                        </form>
                </section>
            </div>
        </>

    )
}
export default Login;