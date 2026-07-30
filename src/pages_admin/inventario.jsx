import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../estilos/inventario.css";
const API_URL = import.meta.env.VITE_API_URL

function Ver_inventario() {

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

    async function obtenerProductos() {
      try{
        const respuesta = await fetch(
          `${API_URL}/productos`
        );

        const data = await respuesta.json();
        setProductos(data)

      }catch (error) {
        console.log(error)
      }
      
    }
    

  return(
    <>
      <div className="contenedor-productos">
          {productos.map((producto) => (
            <div key={producto.id} className="card-producto">
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p>Precio: ${producto.precio}</p>
              <p>Stock: {producto.stock}</p>
            </div>
          ))} 
      </div>
      <div className="contenedor-btnvolver">
          <nav>
              <Link to="/inicio" className="btn-volver">volver</Link>
          </nav>
      </div>
    </>
  );
}

export default Ver_inventario;