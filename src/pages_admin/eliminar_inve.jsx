import { Link } from "react-router-dom";
import "../estilos/eliminar.css"
import { useState } from "react";

function Eliminar(){
    const [idProducto, setIdProducto] = useState("");
    const [idCategoria, setIdCategoria] = useState("");
    const token = localStorage.getItem("token");


    async function eliminarProducto() {
         try {

            const respuesta = await fetch(
            `http://localhost:3000/productos/${idProducto}`,
            {
                method: "DELETE",
                headers: {
                "Authorization": `Bearer ${token}`
                },
            }
            );

            const data = await respuesta.json();

            alert(data.mensaje);

        } catch (error) {

            console.log(error);
            alert("Error al eliminar");

        }

    }

    async function eliminarCategoria() {
         try {

            const respuesta = await fetch(
            `http://localhost:3000/categorias/${idCategoria}`,
            {
                method: "DELETE",
                 headers: {
                "Authorization": `Bearer ${token}`
                },
            }
            );

            const data = await respuesta.json();

            alert(data.mensaje);

        } catch (error) {

            console.log(error);
            alert("Error al eliminar");

        }

    }

    return(
        <>
            <div className="contenedor-eliminar">
                <h1>Eliminar Producto o Categoría</h1>
            </div>
            <div className="contenedor-eliminar">
                <div className="card-eliminar">
                    <h2>Eliminar producto</h2>

                    <input
                    type="text"
                    placeholder="Ingrese ID o nombre del producto"
                    value={idProducto}
                    onChange={(e) =>
                        setIdProducto(e.target.value)
                    }
                    />

                    <button className="btn-eliminar" onClick={eliminarProducto}>
                    Eliminar producto
                    </button>
                </div>

                <div className="card-eliminar">
                    <h2>Eliminar categoría</h2>

                    <input
                    type="text"
                    placeholder="Ingrese ID o nombre de la categoría"
                    value={idCategoria}
                    onChange={(e) =>
                        setIdCategoria(e.target.value)
                    }
                    />

                    <button className="btn-eliminar" onClick={eliminarCategoria}>
                    Eliminar categoría
                    </button>
                </div>
            </div>
            

            <div className="contenedor-btnvolver">
                <nav>
                    <Link to="/inicio" className="btn-volver">
                    ← Volver al inicio
                    </Link>
                </nav>
            </div>
        </>

    );

};
export default Eliminar;