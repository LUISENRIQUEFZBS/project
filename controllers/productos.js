const Producto = require('../models/producto');
const Carrito = require('../models/carrito');
const path = require('../utils/path');

exports.getProductosBienvenido = (req, res) => {
    Producto.fetchAll(productos => {
        res.render('tienda/index', {
            prods: productos,
            titulo: "Página principal de la Tienda",
            path: "/"
        });
    });
};

exports.getProductosMobile = (req, res) => {
    Producto.fetchAll(productos => {
        const productosMobile = productos.filter(producto => producto.categoria === 'mobile');
        res.render('tienda/index', {
            prods: productosMobile,
            titulo: "Productos Mobile",
            path: "/mobile"
        });
    });
};

exports.getProductosTvaudio = (req, res) => {
    Producto.fetchAll(productos => {
        const productosTvAudio = productos.filter(producto => producto.categoria === 'tv_audio');
        res.render('tienda/index', {
            prods: productosTvAudio,
            titulo: "Productos TV & Audio",
            path: "/tv_audio"
        });
    });
};

exports.getProductosElectrodomesticos = (req, res) => {
    Producto.fetchAll(productos => {
        const productosElectrodomesticos = productos.filter(producto => producto.categoria === 'electrodomesticos');
        res.render('tienda/index', {
            prods: productosElectrodomesticos,
            titulo: "Electrodomésticos",
            path: "/electrodomesticos"
        });
    });
};

exports.getProductosTecnologiaai = (req, res) => {
    Producto.fetchAll(productos => {
        const productosTecnologiaAI = productos.filter(producto => producto.categoria === 'tecnologia_ai'); // Asegúrate que esta categoría coincida con tu JSON
        res.render('tienda/index', {
            prods: productosTecnologiaAI,
            titulo: 'Tecnologia-ai',
            path: '/tecnologia_ai'
        });
    });
};

exports.getProductosVentasespeciales = (req, res) => {
    Producto.fetchAll(productos => {
        const productosVentasEspeciales = productos.filter(producto => producto.categoria === 'ventas_especiales'); // Asegúrate que esta categoría coincida con tu JSON
        res.render('tienda/index', {
            prods: productosVentasEspeciales,
            titulo: 'Ventas Especiales',
            path: '/ventas_especiales'
        });
    });
};

exports.getCarrito = (req, res, next) => {
    Carrito.getCarrito(carrito => {
        Producto.fetchAll(productos => {
            const productosCarrito = [];
            if (carrito && carrito.productos) {
             for (producto of productos) {
                 const productoEnCarrito = carrito.productos.find(
                     prod => prod.id === producto.id
                 );
                 if (productoEnCarrito) {
                     productosCarrito.push({ dataProducto: producto, cantidad: productoEnCarrito.cantidad, nombreproducto: productoEnCarrito.nombreproducto});
                 }
             }
            }
            res.render('tienda/carrito', {
                titulo: 'Mi carrito',
                path: '/carrito',
                productos: productosCarrito
            });
        });
    });
};

exports.postCarrito = (req, res) => {
    const idProducto = req.body.idProducto;
    Producto.findById(idProducto, producto => {
        Carrito.agregarProducto(idProducto, producto.precio, producto.nombreproducto);
        res.redirect('/carrito');
    });
}

exports.postEliminarProductoCarrito = (req, res) => {
    const idProducto = req.body.idProducto;
    Producto.findById(idProducto, producto =>{
        Carrito.eliminarProducto(idProducto, producto.precio);
        res.redirect('/carrito');
    });
};

exports.getProducto = (req, res) => {
    const idProducto = req.params.idProducto;
    Producto.findById(idProducto, (producto) => {
        res.render('tienda/detalle-producto', {
            producto: producto,
            titulo: producto.nombre,
            path: "/"
        })
    })
}
