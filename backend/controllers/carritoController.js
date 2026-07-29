const supabase = require("../supabase");

exports.obtenerCarrito = async (req, res) => {

    const usuarioId = req.usuario.id;

    const { data, error } = await supabase
        .from("carrito")
        .select(`
            id,
            estado,
            detalle_carrito (
                id,
                cantidad,
                productos (
                    id,
                    nombre,
                    precio,
                    descripcion
                )
            )
        `)
        .eq("usuario_id", usuarioId)
        .eq("estado","activo")
        .single();

    if (error){
        return res.status(404).json({
            mensaje: "Carrito no encontrado"
        })
    }
    data.detalle_carrito.sort((a, b) => a.id - b.id);
    res.json(data);
};

exports.actualizarCantidad = async (req, res) =>{

    const { id } = req.params;

    const { cantidad } = req.body;

    const { error } = await supabase
        .from("detalle_carrito")
        .update({
            cantidad
        })
        .eq("id", id);

    if (error) {

        return res.status(500).json(error);

    }

    res.json({
        mensaje: "Cantidad actualizada"
    });

}

exports.eliminarProducto = async (req, res) => {

    const { id } = req.params;

    const { error } = await supabase
        .from("detalle_carrito")
        .delete()
        .eq("id", id);

    if (error) {

        return res.status(500).json(error);

    }

    res.json({
        mensaje: "Producto eliminado"
    });

};

exports.agregarProductos = async (req, res) => {

    const usuario_id = req.usuario.id

    const {producto_id} = req.body

    // Buscar si el usuario ya tiene un carrito activo
    let { data: carrito, error } = await supabase
        .from("carrito")
        .select("*")
        .eq("usuario_id", usuario_id)
        .eq("estado", "activo")
        .single();

    // Si no existe el carrito, lo creamos
    if (error || !carrito) {

        const { data: nuevoCarrito, error: errorCrear } = await supabase
            .from("carrito")
            .insert([
                {
                    usuario_id,
                    estado: "activo"
                }
            ])
            .select()
            .single();

        if (errorCrear) {
            return res.status(500).json(errorCrear);
        }

        carrito = nuevoCarrito;
    }

    // Buscar si el producto ya está en el carrito
    const { data: detalle } = await supabase
        .from("detalle_carrito")
        .select("*")
        .eq("carrito_id", carrito.id)
        .eq("producto_id", producto_id)
        .single();

    // Si ya existe, aumentar la cantidad
    if (detalle) {

        const { error: errorActualizar } = await supabase
            .from("detalle_carrito")
            .update({
                cantidad: detalle.cantidad + 1
            })
            .eq("id", detalle.id);

        if (errorActualizar) {
            return res.status(500).json(errorActualizar);
        }

    } else {

        // Si no existe, agregarlo al carrito
        const { error: errorInsertar } = await supabase
            .from("detalle_carrito")
            .insert([
                {
                    carrito_id: carrito.id,
                    producto_id,
                    cantidad: 1
                }
            ]);

        if (errorInsertar) {
            return res.status(500).json(errorInsertar);
        }

    }

    res.json({
        mensaje: "Producto agregado al carrito"
    });

}

exports.finalizarCompra = async (req, res) => {

    const usuarioId = req.usuario.id;

    const { data: carrito } = await supabase
    .from("carrito")
    .select("*")
    .eq("usuario_id", usuarioId)
    .eq("estado", "activo")
    .single();

    const { error } = await supabase
        .from("carrito")
        .update({
            estado: "comprado"
        })
        .eq("id", carrito.id);

    if (error) {
        return res.status(500).json(error);
    }

    res.json({
        mensaje: "Compra realizada correctamente"
    });

}
