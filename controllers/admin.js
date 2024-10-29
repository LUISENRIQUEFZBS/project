const Producto = require('../models/producto');

exports.getCrearProducto = (req, res, next) => {
    res.render('admin/editar-producto', { 
        titulo: 'Crear Producto', 
        path: '/admin/crear-producto',
        tienecaracteristicas: false,
        modoEdicion: false
    });
}

exports.postCrearProducto = (req, res, next) => {
    const nombreproducto = req.body.nombreproducto;
    const urlImagen = req.body.urlImagen;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion;
    const caracteristicas = req.body.caracteristicas.split(',').map(c => c.trim());

    const categoriaId = req.categorias.find(catId => catId.categoriaName === req.body.categoria);

    const producto = new Producto({
        nombreproducto: nombreproducto,
        precio: precio,
        descripcion: descripcion,
        urlImagen: urlImagen,
        caracteristicas: caracteristicas,
        categoria: categoriaId._id,
        idUsuario: req.usuario._id
    });
    producto.save()
        .then(result => {
            console.log(result);
            res.redirect('/admin/productos');
        })
        .catch(err => console.log(err));
}

exports.getProductos = (req, res, next) => {
    Producto.find()
      .populate('categoria') // Esto incluye la información completa de la categoría en cada producto
      .then(productos => {
          res.render('admin/productos', {
              prods: productos,
              titulo: "Administracion de Productos",
              path: "/admin/productos"
          });
      })
      .catch(err => console.log(err));
};

exports.getEditProductos = (req, res, next) => {
    const idProducto = req.params.id;
    console.log('Producto', idProducto);
    Producto.findById(idProducto)
    .populate('categoria') // Incluye los detalles de la categoría
    .then(producto => {
        if (!producto) {
            return res.redirect('/admin/productos');
        }
        res.render('admin/editar-producto', {
            titulo: 'Editar Producto',
            path: '/admin/editar-producto',
            producto: producto, // Pasar el producto a la vista
            tienecaracteristicas: Array.isArray(producto.caracteristicas) && producto.caracteristicas.length > 0,
            modoEdicion: true
        });
    })
    .catch(err => console.log(err));
};

exports.postEditProductos = (req, res, next) => {
    const productoId = req.body.idProducto;
    console.log('Producto', productoId);

    const nombreproducto = req.body.nombreproducto;
    const precio = req.body.precio;
    const urlImagen = req.body.urlImagen;
    const descripcion = req.body.descripcion;
    const caracteristicas = req.body.caracteristicas.split(',').map(c => c.trim()); // Convierte en array
    const categoriaId = req.categorias.find(catId => catId.categoriaName === req.body.categoria);

    Producto.findById(productoId)
        .then(producto => {
            if (!producto) {
                return res.redirect('/admin/productos');
            }
            producto.nombreproducto = nombreproducto;
            producto.precio = precio;
            producto.descripcion = descripcion;
            producto.urlImagen = urlImagen;
            producto.caracteristicas = caracteristicas;
            producto.categoria = categoriaId._id;
            producto.idUsuario = req.usuario._id
            // console.log("Nuevo",producto);
            return producto.save();
        })
        .then(result => {
            // console.log('Producto actualizado satisfactoriamente');
            res.redirect('/admin/productos');
        })
        .catch(err => console.log(err));
};

exports.postEliminarProducto = (req, res, next) => {
    const idProducto = req.body.idProducto;
    console.log('Producto', idProducto);
    Producto.findByIdAndDelete(idProducto)
        .then(result => {
            console.log('Producto eliminado satisfactoriamente');
            res.redirect('/admin/productos');
        })
        .catch(err => console.log(err));
};