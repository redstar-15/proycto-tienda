import { useEffect, useState } from "react";
import "../estilos/carrito.css"
const API_URL = import.meta.env.VITE_API_URL

function Carrito () {

    const [carrito, setCarrito] = useState([]);
    const [carritoId, setcarritoId] = useState([])
    const token = localStorage.getItem("token");
    

    async function obtenerCarrito() {

        try {

            const respuesta = await fetch(
                `${API_URL}/carrito`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!respuesta.ok) {
                setCarrito([]);
                return;
            }

            const data = await respuesta.json();
            console.log(data);
            setcarritoId(data.id)
            setCarrito(data.detalle_carrito);
            

        } catch (error) {

            console.log(error);

        }

    }
  
    useEffect(() => {
        obtenerCarrito();
    }, []);

    const total = carrito.reduce(

        (acumulador, item) =>

            acumulador +

            item.productos.precio *

            item.cantidad,

        0

    );
    
    async function cambiarCantidad(id, nuevaCantidad) {

        if (nuevaCantidad < 1) {
            return;
        }

        try {

            const respuesta = await fetch(
                `${API_URL}/carrito/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:`Bearer ${token}`
                    },
                    body: JSON.stringify({
                        cantidad: nuevaCantidad
                    })
                }
            );

            const data = await respuesta.json();

            console.log(data.mensaje);

            obtenerCarrito();

        } catch (error) {

            console.log(error);

        }

    }

    async function eliminarProducto (id) {

        if (!window.confirm("¿Eliminar este producto del carrito?")) {
            return;
        }

        try{

            const respuesta = await fetch(
                `${API_URL}/carrito/${id}`,
                {
                    method: "delete",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                    
                }
            );
            const data = await respuesta.json();

            console.log(data.mensaje);

            obtenerCarrito();

        }catch (error){

            console.log(error);

        }
    }

    async function finalizarCompra (){

        try {

            const respuesta = await fetch(
                `${API_URL}/carrito/finalizar/${carritoId}`,
                {
                    method: "PUT",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            const data = await respuesta.json();

            alert(data.mensaje);

            obtenerCarrito();

        } catch (error) {

            console.log(error);

        }

    }
    
    return (
        <>
            <div className="pagina-carrito">

                <h1 className="titulo-carrito">
                    Mi carrito
                </h1>

                <div className="lista-carrito">

                    {carrito.map((item) => (

                        <div
                            className="card-carrito"
                            key={item.id}
                        >

                            <div className="info-producto">

                                <h3>{item.productos.nombre}</h3>

                                <p>Descripcion: {item.productos.descripcion}</p>

                                <p>Precio: ${item.productos.precio}</p>

                                <p>Cantidad: {item.cantidad}</p>

                                <p>Subtotal: $
                                    {item.productos.precio * item.cantidad}
                                </p>

                            </div>

                            <div className="controles">

                                <button
                                 onClick={() =>
                                    cambiarCantidad(
                                        item.id,
                                        item.cantidad - 1
                                    )
                                }
                                >-</button>

                                <span className="cantidad">
                                    {item.cantidad}
                                </span>

                                <button
                                    onClick={() =>
                                        cambiarCantidad(
                                            item.id,
                                            item.cantidad + 1
                                        )
                                    }
                                >+</button>

                            </div>

                            <button className="btn-eliminar" onClick={()=>eliminarProducto(item.id)}>
                                Eliminar
                            </button>

                        </div>

                    ))}

                </div>

                <div className="total">

                    <h2>Total: ${total}</h2>

                    <button className="btn-comprar" onClick={finalizarCompra}>
                        Finalizar compra
                    </button>

                </div>

            </div>
        </>
    );

}
export default Carrito;