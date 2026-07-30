require("dotenv").config();
const express = require("express");
const cors = require("cors");
const supabase = require("./supabase")
const app = express();


//productos
const productoRouter = require("./routes/productos");
//categorias
const categoriaRouter = require("./routes/categorias");
// registrar usuarios
const registrarUsuario = require("./routes/resgistroUsuarios");
//inicio sesion
const iniciarSesion = require("./routes/login");
// carrito
const carrito = require("./routes/carrito");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://proycto-tienda.vercel.app/"
  ]
}));
app.use(express.json());


app.use("/productos", productoRouter);
app.use("/categorias", categoriaRouter);
app.use("/registro", registrarUsuario);
app.use("/login", iniciarSesion);
app.use("/carrito", carrito);


app.get("/", (req, res) => {
  res.json({
    mensaje: "Servidor funcionando correctamente"
  });
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});