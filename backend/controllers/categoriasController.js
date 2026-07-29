const supabase = require("../supabase");

exports.obtenerCategoria = async (req, res) => {
  const {data, error} = await supabase
    .from("categorias")
    .select("*")
  if (error) {
    return res.status(500).json(error)
  }
  
  res.json(data)
}

exports.obtenerCategoriaId = async (req, res) => {
    const { id } = req.params;

  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(404).json({
      mensaje: "categoria no encontrado"
    });
  }

  res.json(data);
}

exports.agregarCategoria = async (req, res) => {
    const {
      nombre,
      descripcion
    } = req.body;
    if (
      !nombre ||
      !descripcion 
    ) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios."
        });
    }

  const { data, error } = await supabase
    .from("categorias")
    .insert([
      {
        nombre,
        descripcion
      }
    ]);

  if (error) {
    return res.status(500).json(error);
  }

  res.json({
    mensaje: "Categoría agregada correctamente"
  });
}

exports.actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    descripcion
  } = req.body;

  const { error } = await supabase
    .from("categorias")
    .update({
      nombre,
      descripcion
    })
    .eq("id", id);
  if (error) {
    return res.status(500).json(error);
  }

  res.json({
    mensaje: "Categoría actualizada correctamente"
  });
}

exports.eliminarCategoria = async (req, res) => {
    const { id } = req.params;

  const { error } = await supabase
    .from("categorias")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json(error);
  }

  res.json({
    mensaje: "Categoría eliminada correctamente"
  });
}