const Producto = require('../models/producto');

exports.getCrearProducto = (req, res, next) => {
    res.render('admin/crear-producto', { titulo: 'Crear Producto', path: '/admin/crear-producto' });
}

exports.postCrearProducto = (req, res, next) => {
    const nombreproducto = req.body.nombreproducto;
    const urlImagen = req.body.urlImagen;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion;

    const producto = new Producto(nombreproducto, urlImagen, descripcion, precio);

    producto.save();
    res.redirect('/admin/productos');
}

exports.getProductos = (req, res, next) => {
    let productos;
    Producto.fetchAll(productosObtenidos => {
        // console.log('Productos obtenidos:', productosObtenidos);
        productos = productosObtenidos
        res.render('admin/productos', {
            prods: productos, 
            titulo: 'Administracion de Productos', 
            path: '/admin/productos'
        });
    });
}

// Controlador para obtener el producto a editar
exports.getEditProductos = (req, res, next) => {
    const productoId = req.params.id; // Obtiene el ID del producto de los parámetros de la URL
    Producto.findById(productoId, producto => {
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }
        console.log(producto);
        res.render('admin/editar-producto', {
            titulo: 'Editar Producto',
            path: '/admin/editar-producto',
            producto: producto // Pasar el producto a la vista
        });
    });
};

// Controlador para guardar los cambios del producto editado
exports.postEditProductos = (req, res, next) => {
    const productoId = req.params.id; // Obtiene el ID del producto de los parámetros de la URL
    const updatedData = {
        nombreproducto: req.body.nombreproducto,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
    };

    // Solo asigna la nueva URL de imagen si existe
    if (req.body.urlImagen) {
        updatedData.urlImagen = req.body.urlImagen;
    }

    // Actualiza el producto
    Producto.update(productoId, updatedData, (result) => {
        if (result) {
            res.redirect('/admin/productos'); // Redirige si la actualización fue exitosa
        } else {
            console.error('Producto no encontrado en la actualización.'); // Mensaje de depuración
            res.status(404).send('Producto no encontrado');
        }
    });
};
