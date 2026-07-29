const supabase = require("../supabase");
const bcrypt = require("bcrypt");



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
    if (error) {
        return res.status(500).json(error);
    }

    res.json({
        mensaje: "usuario registrado correctamete"
    })
}