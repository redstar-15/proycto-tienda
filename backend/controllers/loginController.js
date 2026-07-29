const supabase = require("../supabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.iniciarSesion = async (req, res) => {
    const  {
        correo,
        password
    } = req.body

    const {data, error} = await supabase
        .from("usuarios")
        .select("*")
        .eq("correo", correo)
        .single()
    
    if (error){
        return res.status(404).json({
            mensaje: "usuario no encontrado"
        });
    }

    const coincide = await bcrypt.compare(
        password,
        data.password
    )

    if (coincide == false) {
        return res.status(401).json({
            mensaje: "Contraseña incorrecta"
        });
    } 
    const token = jwt.sign(
        {
            id: data.id,
            nombre: data.nombre,
            rol: data.rol
        },
        process.env.JWT_Clave,
        {
            expiresIn: "2h"
        }
    )

    res.json({
        mensaje: "Inicio de sesión exitoso",
        token
    });
    
    

}
