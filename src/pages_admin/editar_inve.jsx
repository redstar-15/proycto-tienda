import { Link } from "react-router-dom";
import { useState } from "react";
import "../estilos/editar.css"

function Editar(){
    const [idProducto, setIdProducto] = useState("");
    const [nombreProducto, setNombreProducto] = useState("");
    const [descripcionProducto, setDescripcionProducto] = useState("");
    const [precioProducto, setPrecioProducto] = useState("");
    const [stockProducto, setStockProducto] = useState("");

    const [idCategoria, setIdCategoria] = useState("");
    const [nombreCategoria, setNombreCategoria] = useState("");
    const [descripcionCategoria, setDescripcionCategoria] = useState("");
    const token = localStorage.getItem("token");

    async function actualizarProducto() {
       try {

            const respuesta = await fetch(
            `http://localhost:3000/productos/${idProducto}`,
            {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                },
                    body: JSON.stringify({
                    nombre: nombreProducto,
                    descripcion: descripcionProducto,
                    precio: Number(precioProducto),
                    stock: Number(stockProducto)
                })
                }
            );

            const data = await respuesta.json();

            alert(data.mensaje);

        } catch (error) {

            console.log(error);
            alert("Error al actualizar");

        }

    }

    async function actualizarCategoria() {
        try {

            const respuesta = await fetch(
            `http://localhost:3000/categorias/${idCategoria}`,
            {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                },
                    body: JSON.stringify({
                    nombre: nombreCategoria,
                    descripcion: descripcionCategoria
                })
                }
            );

            const data = await respuesta.json();

            alert(data.mensaje);

        } catch (error) {

            console.log(error);
            alert("Error al actualizar");

        }

    }

    async function buscarProducto() {
        const respuesta = await fetch(
            `http://localhost:3000/productos/${idProducto}`,
            {
                headers: {
                "Authorization": `Bearer ${token}`
                },
            }
            
        );

        const data = await respuesta.json();

        setNombreProducto(data.nombre);
        setDescripcionProducto(data.descripcion);
        setPrecioProducto(data.precio);
        setStockProducto(data.stock);
    }

    async function buscarCategoria() {
       const respuesta = await fetch(
        `http://localhost:3000/categorias/${idCategoria}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        }
       );
       const data = await respuesta.json();
       setNombreCategoria(data.nombre);
       setDescripcionCategoria(data.descripcion)
    }


    return(
        <>
            <h1>Editar producto o categoría</h1>

            <section className="editar-producto">
                <h2>Editar producto</h2>

                <input
                    type="text"
                    placeholder="ID del producto"
                    value={idProducto}
                    onChange={(e) =>
                        setIdProducto(e.target.value)
                    }
                />
                <button onClick={buscarProducto}>
                    Buscar producto
                </button>

                <input
                    type="text"
                    placeholder="Nuevo nombre"
                    value={nombreProducto || "" }
                    onChange={(e) =>
                        setNombreProducto(e.target.value)
                    }
                />

                <textarea
                    placeholder="Nueva descripción"
                    value={descripcionProducto}
                    onChange={(e) =>
                        setDescripcionProducto(e.target.value)
                    }
                ></textarea>

                <input
                    type="number"
                    placeholder="Nuevo precio"
                    value={precioProducto}
                    onChange={(e) =>
                        setPrecioProducto(e.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Nuevo stock"
                    value={stockProducto}
                    onChange={(e) =>
                        setStockProducto(e.target.value)
                    }
                />

                <button onClick={actualizarProducto}>Actualizar producto</button>
            </section>

            <section className="editar-categoria">
                <h2>Editar categoría</h2>

                <input
                    type="text"
                    placeholder="ID de la categoría"
                    value={idCategoria}
                    onChange={(e) =>
                        setIdCategoria(e.target.value)
                    }
                />
                <button onClick={buscarCategoria}>
                  Buscar categoría
                </button>

                <input
                    type="text"
                    placeholder="Nuevo nombre"
                    value={nombreCategoria || "" }
                    onChange={(e)=>
                        setNombreCategoria(e.target.value)
                    }
                />

                <textarea
                type= "text"
                placeholder="Nueva descripción"
                value= {descripcionCategoria}
                onChange={(e) => 
                    setDescripcionCategoria(e.target.value)
                }
                ></textarea>

                <button onClick={actualizarCategoria}>Actualizar categoría</button>
            </section>

            <div className="contenedor-btnvolver">
                <nav>
                    <Link to="/inicio" className="btn-volver">
                    Volver
                    </Link>
                </nav>
            </div>
            
        </>

    );

};
export default Editar;