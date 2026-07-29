const jwt = require("jsonwebtoken");

exports.verificarToken = (req, res, next) => {

     const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            mensaje: "Token no enviado"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const usuario = jwt.verify(
            token,
            process.env.JWT_Clave
        );

        req.usuario = usuario;

        next();

    } catch (error) {

        return res.status(401).json({
            mensaje: "Token inválido"
        });

    }


};

exports.verificarAdmin = (req, res, next) => {
    if(req.usuario.rol !== "admin"){

        return res.status(403).json({
            mensaje: "No tienes permisos."
        });

    }

    next();

}

