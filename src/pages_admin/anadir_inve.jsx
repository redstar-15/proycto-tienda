import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../estilos/anadir.css"
const API_URL = import.meta.env.VITE_API_URL


function Anadir_inve (){
    const [nombreProducto, setNombreProducto] = useState("");
    const [descripcionProducto, setDescripcionProducto] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");

    const [nombreCategoria, setNombreCategoria] = useState("");
    const [descripcionCategoria, setDescripcionCategoria] = useState("");

    const [categorias, setCategorias] = useState([]);
    const [categoriaId, setCategoriaId] = useState("");

    const token = localStorage.getItem("token");

    async function obtenerCategorias() {

        const respuesta = await fetch(
            `${API_URL}/categorias`
        );

        const data = await respuesta.json();

        setCategorias(data);

    }

    useEffect(() => {

        obtenerCategorias();

    }, []);

    async function guardarProducto(e) {
        e.preventDefault();
        console.log(precio)

        if (
            !nombreProducto.trim() ||
            !descripcionProducto.trim() ||
            !precio ||
            !stock ||
            !categoriaId 
        ) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try{
            const respuesta = await fetch(
                `${API_URL}/productos`,
                {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        nombre: nombreProducto,
                        descripcion: descripcionProducto,
                        precio: Number(precio),
                        stock: Number(stock),
                        categoria_id: Number(categoriaId)
                    })
                }
            );
           

            const data = await respuesta.json();
            alert(data.mensaje);

            setNombreProducto("");
            setDescripcionProducto("");
            setPrecio("");
            setStock("");

        } catch (error){
            console.log(error);
            alert("Error al guardar producto")
        }

    }  
    async function guardarCategoria(e) {
        e.preventDefault();
        if (!nombreCategoria ||
            !descripcionCategoria
        ) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try{

            const respuesta = await fetch(
            `${API_URL}/categorias`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    nombre: nombreCategoria,
                    descripcion: descripcionCategoria
                })
            } );

            const data = await respuesta.json();

            alert(data.mensaje);

            setNombreCategoria("");
            setDescripcionCategoria("");

        } catch (error) {

            console.log(error);
            alert("Error al guardar categoría");

         }
    } 
    
    return(
        <>
            <div>
                <h1>Añadir producto o categoría</h1>
            </div>

            <section className="formulario-producto">
                <h2>Añadir producto</h2>

                <form onSubmit={guardarProducto}>
                <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={nombreProducto}
                    onChange={(e) =>
                        setNombreProducto(e.target.value)
                    }
                />

                <textarea
                    placeholder="Descripción"
                    value={descripcionProducto}
                    onChange={(e) =>
                        setDescripcionProducto(e.target.value)
                    }
                ></textarea>

                <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) =>
                        setPrecio(e.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) =>
                        setStock(e.target.value)
                    }
                />
                <label>Categoría</label>

                <select
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                >

                    <option value="">
                        Seleccione una categoría
                    </option>

                    {
                        categorias.map((categoria) => (

                            <option
                                key={categoria.id}
                                value={categoria.id}
                            >
                                {categoria.nombre}
                            </option>

                        ))
                    }

                </select>

                <button type="submit">
                    Guardar producto
                </button>
                </form>
            </section>

            <section className="formulario-categoria">
                <h2>Añadir categoría</h2>

                <form onSubmit={guardarCategoria}>
                <input
                    type="text"
                    placeholder="Nombre de la categoría"
                    value={nombreCategoria}
                    onChange={(e) =>
                        setNombreCategoria(e.target.value)
                    }
                />

                <textarea
                    placeholder="Descripción"
                    value={descripcionCategoria}
                    onChange={(e) =>
                        setDescripcionCategoria(e.target.value)
                    }
                ></textarea>

                <button type="submit">
                    Guardar categoría
                </button>
                </form>
            </section>
            <div className="contenedor-btnvolver">
                <nav>
                    <Link to="/inicio" className="btn-volver">
                    Volver
                    </Link>
                </nav>
            </div>
        </>
        
    )

};
export default Anadir_inve;