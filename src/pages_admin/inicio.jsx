import { Link } from "react-router-dom";
import "../estilos/inicio.css";
const API_URL = import.meta.env.VITE_API_URL

function Inicio(){

    return(
        <>

            <section className="seccion-titulo">
                <div>
                    <h1>inventario app</h1>
                    <p>gestiona tus productos de manera sencilla</p>
                </div>

            </section>

            <section className="seccion-opcciones">
                <nav className="contenedor-botones">

                    <Link to="/inventario" className="btn-menu">
                    Ver inventario
                    </Link>

                    <Link to="/anadir_inve" className="btn-menu">
                    Añadir producto
                    </Link>

                    <Link to="/editar_inve" className="btn-menu">
                    Editar producto
                    </Link>

                    <Link to="/eliminar_inve" className="btn-menu">
                    Eliminar producto
                    </Link>

                </nav>
            </section>
        </>
    );
}
export default Inicio;