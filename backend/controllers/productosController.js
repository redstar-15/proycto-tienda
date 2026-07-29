const supabase = require("../supabase")

exports.obtenerProductos = async (req, res ) => {

    const {data, error } = await supabase
        .from("productos")
        .select("*")
    if (error){
        return res.status(500).json(error);
    } 
    
    res.json(data);
    
}

exports.obtenerProductoId = async (req, res) => {
    const { id } = req.params;

  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(404).json({
      mensaje: "Producto no encontrado"
    });
  }

  res.json(data);
}

exports.agregarProducto = async (req, res) => {
    const {
      nombre,
      descripcion,
      precio,
      stock,
      categoria_id
    } = req.body;
    if (
      !nombre ||
      !descripcion ||
      !precio ||
      !stock ||
      !categoria_id
    ) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios."
        });
    }
    const {data, error} = await supabase 
      .from("productos")
      .insert([{
        nombre,
        descripcion,
        precio,
        stock,
        categoria_id
      }])
    if (error){
        return res.status(500).json(error);
    }

    res.json({
        mensaje: "producto agreado correcctamente"
    })
}

exports.actualizarProducto = async (req, res) =>{
  const {id} = req.params;
  const {
    nombre,
    descripcion,
    precio,
    stock
  } = req.body;

  const {error} = await supabase
    .from("productos")
    .update({
      nombre,
      descripcion,
      precio,
      stock
    })
    .eq("id", id);
    if (error) {
      return res.status(500).json(error);
    }
    res.json({
      mensaje: "Producto actualizado correctamente"
    });
}

exports.eliminarProducto = async (req, res) => {
    const { id } = req.params;

  const { error } = await supabase
    .from("productos")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json(error);
  }

  res.json({
    mensaje: "Producto eliminado correctamente"
  });
}