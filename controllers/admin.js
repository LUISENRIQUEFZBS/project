const fs = require('fs');
const path = require('path');

const raizDir = require('../utils/path.js');
const p = path.join(raizDir, 'data', 'productos.json');

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
    const updatedNombre = req.body.nombreproducto; // Obtiene los datos del formulario
    const updatedPrecio = req.body.precio;
    const updatedDescripcion = req.body.descripcion;

    // Usa el método fetchAll para obtener los productos
    Producto.fetchAll(productos => {
        const productoIndex = productos.findIndex(p => p.id === productoId);
        if (productoIndex >= 0) {
            // Actualiza el producto
            const updatedProducto = { 
                id: productoId,
                nombreproducto: updatedNombre,
                precio: updatedPrecio,
                descripcion: updatedDescripcion,
                // No necesitas actualizar la imagen, si no es necesario
            };
            productos[productoIndex] = updatedProducto; // Reemplaza el producto en el array
            
            fs.writeFile(p, JSON.stringify(productos), (err) => {
                if (err) {
                    console.error('No se pudo guardar el producto.');
                }
                res.redirect('/admin/productos'); // Redirige a la lista de productos
            });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    });
};

