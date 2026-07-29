import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function RutaProtegida({ children }) {

    const token = localStorage.getItem("token");

    // No hay sesión
    if (!token) {
        return <Navigate to="/login" />;
    }

    try {

        const usuario = jwtDecode(token);

        // No es administrador
        if (usuario.rol !== "admin") {
            return <Navigate to="/" />;
        }

        // Es administrador
        return children;

    } catch (error) {

        localStorage.removeItem("token");

        return <Navigate to="/login" />;

    }

}

export default RutaProtegida;