import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../estilos/registro.css";
import { jwtDecode } from "jwt-decode";
const API_URL = import.meta.env.VITE_API_URL

function Registro(){

    const [nombreUsuario, setnombreUsuario] = useState("");
    const [correoUsuario, setcorreoUsuario] = useState("");
    const [contrasenaUsuario, setcontrasenaUsuario] = useState("");
    const [contrasenaUsuarioRe, setcontrasenaUsuarioRe] = useState("");

    const navigate =  useNavigate();


    async function registrarUsuario (e){
        e.preventDefault()

        if (contrasenaUsuario !== contrasenaUsuarioRe ) {
            alert("contraseñas no coinciden")
            return;
        }

        try{
            const respuesta = await fetch(
                `${API_URL}/registro`,
                {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nombre: nombreUsuario,
                        correo: correoUsuario,
                        password: contrasenaUsuario
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

            if (usuario.rol ==="cliente"){
                window.location.href = "/";
                navigate("/")
            }
            setnombreUsuario("")
            setcorreoUsuario("")
            setcontrasenaUsuario("")
            setcontrasenaUsuarioRe("")

        } catch (error){
            console.log(error);
            alert("Error al registrarse")
        }
        
    }

    return(
        <> 
            <div className="pagina-registro">
                <div>
                    <h1>registrarse </h1>
                </div>

                <section className="formulario">
                    <form onSubmit={registrarUsuario}>
                        <input
                            type="text"
                            placeholder="nombre"
                            value={nombreUsuario}
                            onChange={(e) =>
                                setnombreUsuario(e.target.value)
                            }
                        />

                        <input
                            type="text"
                            placeholder="correo"
                            value={correoUsuario}
                            onChange={(e) =>
                                setcorreoUsuario(e.target.value)
                            }
                        />

                        <input
                            type="password"
                            placeholder="contraseña"
                            value={contrasenaUsuario}
                            onChange={(e) =>
                                setcontrasenaUsuario(e.target.value)
                            }
                        />

                        <input
                            type="password"
                            placeholder="repetir contraseña"
                            value={contrasenaUsuarioRe}
                            onChange={(e) =>
                                setcontrasenaUsuarioRe(e.target.value)
                            }
                        />

                        <button type="submit">
                            registrarse
                        </button>

                        <p className="texto-login">
                            ¿Ya tienes una cuenta?
                        </p>

                        <Link to="/login" className="link-login">
                            Iniciar sesión
                        </Link>
                    </form>
                </section>
            </div>
        </>
    );
}
export default Registro;