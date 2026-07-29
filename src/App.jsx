import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages_admin/inicio";
import Ver_inventario from "./pages_admin/inventario";
import Anadir_inve from "./pages_admin/anadir_inve";
import Editar from "./pages_admin/editar_inve";
import Eliminar from "./pages_admin/eliminar_inve";
import Login from "./pages/login";
import Registro from "./pages/registro";
import Home_tienda from "./pages/home_tienda";
import Carrito from "./pages/carrito";
import RutaProtegida from "./componentes/RutaProtegida";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/inicio" element={<RutaProtegida> <Inicio /> </RutaProtegida>} />
        <Route path ="/inventario" element={<RutaProtegida> <Ver_inventario/> </RutaProtegida>} />
        <Route path="/anadir_inve" element={<RutaProtegida> <Anadir_inve/> </RutaProtegida>}/>
        <Route path="/editar_inve" element={<RutaProtegida> <Editar/> </RutaProtegida>}/>
        <Route path="/eliminar_inve" element={<RutaProtegida> <Eliminar/> </RutaProtegida>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/" element={<Home_tienda/>}/>
        <Route path="/carrito" element={<Carrito/>}/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;