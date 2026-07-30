const supabase = require("../supabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.registrarUsuario = async (req, res) => {
    const {
        nombre,
        correo,
        password
    } = req.body

    const passwordHash = await bcrypt.hash(password,10)

    const {data, error} = await supabase
        .from("usuarios")
        .insert([{
            nombre,
            correo,
            password: passwordHash
        }])
        .select()
        .single()
    if (error) {
        return res.status(500).json(error);
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
        mensaje: "usuario registrado correctamete",
        token
    })
}