import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function Productos() {
  const [productos, setProductos] =
    useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  async function obtenerProductos() {
    const { data, error } =
      await supabase
        .from("productos")
        .select("*");

    if (!error) {
      setProductos(data);
    }
  }

  return (
    <div>
      <h2>Productos</h2>

      {productos.map((producto) => (
        <div key={producto.id}>
          {producto.nombre}
        </div>
      ))}
    </div>
  );
}

export default Productos;