const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const Pedido = require('../models/pedido');

exports.getProductos = (req, res) => {
    const categoria_ruta = req.params.categoria;

    Promise.all([
        Categoria.find(),
        Producto.find().populate('categoria') // Obtener todos los productos y popular la categoría asociada
    ])
    .then(([categorias, productos]) => {
        const categoriasDisponibles = {}; 

        categorias.forEach(cat => {
            categoriasDisponibles[cat.categoriaRuta] = cat.categoriaName;
        });

        let productosFiltrados = productos;
        if (categoria_ruta) {
            const categoriaId = categorias.find(cat => cat.categoriaRuta === categoria_ruta)?._id;
            if (categoriaId) {
                productosFiltrados = productos.filter(producto => producto.categoria._id.toString() === categoriaId.toString());
            }
        }

        const titulo = categoria_ruta ? categoriasDisponibles[categoria_ruta] : "Página principal de la Tienda";

        console.log("A donde me dirijo ", categoria_ruta);

        res.render('tienda/index', {
            prods: productosFiltrados,
            titulo: titulo,
            path: `/${categoria_ruta || ''}`,
        });
    })
    .catch(err => console.log(err)); 
};

exports.getProducto = (req, res) => {
    const idProducto = req.params.idProducto;
    Producto.findById(idProducto)
        .then(producto => {
            if (!producto) {
                res.redirect('/');
            }
            res.render('tienda/detalle-producto', {
                producto: producto,
                titulo: producto.nombre,
                path: '/productos',
                autenticado: req.session.autenticado
            });
        })
        .catch(err => console.log(err));
}

exports.getCarrito = (req, res, next) => {
    req.usuario
        .populate('carrito.items.idProducto')
        .then(usuario => {
            const productos = usuario.carrito.items;
            res.render('tienda/carrito', {
                path: '/carrito',
                titulo: 'Mi Carrito',
                productos: productos,
                autenticado: req.session.autenticado,
            });
        })
        .catch(err => console.log(err));
};

exports.postCarrito = (req, res) => {
    const idProducto = req.body.idProducto;
    const cantidad = parseInt(req.body.quantity) || 1;
    
    // console.log("Cantidad:",cantidad);

    Producto.findById(idProducto)
        .then(producto => {
            if (!producto) {
                throw new Error('Producto no encontrado');
            }
            return req.usuario.agregarAlCarrito(producto, cantidad);
        })
        .then(result => {
            console.log(result);
            res.redirect('/carrito');
        })
        .catch(err => console.log(err));
};


exports.getCarritoAPI = (req, res, next) => {
    req.usuario
        .populate('carrito.items.idProducto')
        .then(usuario => {
            const productosCarrito = usuario.carrito.items.map(item => {
                return {
                    id: item.idProducto._id,
                    nombreproducto: item.idProducto.nombreproducto,
                    cantidad: item.cantidad,
                    precio: item.idProducto.precio
                };
            });

            const precioTotal = productosCarrito.reduce((total, item) => {
                return total + item.precio * item.cantidad; // Calcular el precio total del carrito
            }, 0);

            res.json({
                productos: productosCarrito,
                precioTotal: precioTotal
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener el carrito' });
        });
};



exports.postEliminarProductoCarrito = (req, res, next) => {
    const idProducto = req.body.idProducto;
    req.usuario.deleteItemDelCarrito(idProducto)
        .then(result => {
            res.redirect('/carrito');
        })
        .catch(err => console.log(err));

};
exports.getPedidos = (req, res, next) => {
    req.usuario
        Pedido.find({ 'usuario.idUsuario': req.usuario._id })
        .then(pedidos => {
            console.log(pedidos);
            res.render('tienda/pedidos', {
                path: '/pedidos',
                titulo: 'Mis Pedidos',
                pedidos: pedidos,
                autenticado: req.session.autenticado
            });
        })
        .catch(err => console.log(err));
};


exports.postPedido = (req, res, next) => {
    req.usuario
        .populate('carrito.items.idProducto')
        .then(usuario => {
        const productos = usuario.carrito.items.map(i => {
            return { cantidad: i.cantidad, producto: { ...i.idProducto._doc } };
        });
        const pedido = new Pedido({
            usuario: {
            nombres: req.usuario.nombres,
            apellidos: req.usuario.apellidos,
            email: req.usuario.email,
            idUsuario: req.usuario._id
            },
            productos: productos
        });
        return pedido.save();
        })
        .then(result => {
            return req.usuario.clearCarrito();
        })
        .then(() => {
            res.redirect('/pedidos');
        })
        .catch(err => console.log(err));
};