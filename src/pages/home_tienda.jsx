import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../estilos/tienda.css";
import { jwtDecode } from "jwt-decode";
const API_URL = import.meta.env.VITE_API_URL
const token = localStorage.getItem("token");


function Home_tienda() {

    const [productos, setProductos] = useState([]);
    const [carrito, setcarrito] = useState([])
    const [usuario, setusuario] = useState(null);
    const navigate = useNavigate();
    console.log(import.meta.env.VITE_API_URL);

    useEffect(() => {
        obtenerProductos();
    }, []);

    async function obtenerProductos() {

        

        try {

            const respuesta = await fetch(`${API_URL}/productos`);

            const data = await respuesta.json();

            setProductos(data);

        } catch (error) {

            console.log(error);

        }

        if (token) {
            const datosUsuario = jwtDecode(token);
            setusuario(datosUsuario);
        }
    }

    async function agregarCarrito(producto){

        try{

            const respuesta = await fetch(
                `${API_URL}/carrito`,
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({

                        producto_id: producto.id

                    })
                }
            );

            const data = await respuesta.json();

            alert(data.mensaje);

        }catch(error){

            console.log(error);

        }
    }

    function cerrarSesion (){
        localStorage.removeItem("token")
        setusuario(null);
        navigate("/")
    }


    return (
        <>

            <div className="pagina-tienda">
                <header className="header-tienda">

                    <h1>Tienda Virtual</h1>

                    <div>

                        <Link to="/carrito" className="btn">
                            🛒 Carrito
                        </Link>
                        {
                            usuario ? (

                                <>

                                    <span className="usuario">
                                        👤 Hola, {usuario.nombre}
                                    </span>

                                    <button
                                        className="btn"
                                        onClick={cerrarSesion}
                                    >
                                        Cerrar sesión
                                    </button>

                                </>

                            ) : (

                                <>

                                    <Link to="/login" className="btn">
                                        Iniciar sesión
                                    </Link>

                                    <Link to="/registro" className="btn">
                                        Registrarse
                                    </Link>

                                </>

                            )
                        }
        
                    </div>

                </header>


                <div className="buscador">

                    <input
                        type="text"
                        placeholder="Buscar producto..."
                    />

                </div>


                <div className="contenedor-productos">

                    {productos.map((producto) => (

                        <div
                            className="card-producto"
                            key={producto.id}
                        >

                            <h3>{producto.nombre}</h3>

                            <p>{producto.descripcion}</p>

                            <h4>$ {producto.precio}</h4>

                            <p>Disponibles: {producto.stock}</p>

                            <button onClick={()=> agregarCarrito(producto)}> 
                                Agregar al carrito
                            </button>

                        </div>

                    ))}

                </div>

                <h2>Carrito</h2>
                {
                    carrito.map((producto) => (

                    <div key={producto.id}>
                        <h4>{producto.nombre}</h4>

                        <p>Cantidad: {producto.cantidad}</p>

                        <p>Total: ${producto.precio * producto.cantidad}</p>

                    </div>

                    ))
                }       

            </div> 
            
        </>
    );

}

export default Home_tienda;