const Producto = require('../models/producto');

exports.getProductos = (req, res) => {
    console.log(req.params);
    const categoria = req.params.categoria; // Obtener la categoría desde los parámetros de la ruta
    const categoriasDisponibles = {
        mobile: "Productos Mobile",
        tv_audio: "Productos TV & Audio",
        electrodomesticos: "Electrodomésticos",
        tecnologia_ai: "Tecnología AI",
        ventas_especiales: "Ventas Especiales"
    };

    Producto.fetchAll(productos => {
        let productosFiltrados = productos;

        if (categoria) {
            productosFiltrados = productos.filter(producto => producto.categoria === categoria);
        }

        const titulo = categoriasDisponibles[categoria] || "Página principal de la Tienda";

        res.render('tienda/index', {
            prods: productosFiltrados,
            titulo: titulo,
            path: `/${categoria || ''}`
        });
    });
};

exports.getProducto = (req, res) => {
    const idProducto = req.params.idProducto;
    Producto.findById(idProducto, (producto) => {
        res.render('tienda/detalle-producto', {
            producto: producto,
            titulo: producto.nombre,
            path: "/"
        });
    });
};
