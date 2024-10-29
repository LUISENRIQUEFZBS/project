const express = require('express');
const router = express.Router();
const usuarioController= require('../controllers/usuario');
const tiendaController = require('../controllers/tienda');

// Rutas específicas primero para no enviar a la pagina de categorias
router.get('/pedidos', usuarioController.isLoggedIn, tiendaController.getPedidos);
router.post('/crear-pedido', usuarioController.isLoggedIn, tiendaController.postPedido);

router.get('/productos/:idProducto', usuarioController.isLoggedIn, tiendaController.getProducto); //detalles productos

router.get('/carrito', usuarioController.isLoggedIn, tiendaController.getCarrito);
router.get('/api/carrito', usuarioController.isLoggedIn, tiendaController.getCarritoAPI); // info para el carrito
router.post('/carrito', usuarioController.isLoggedIn, tiendaController.postCarrito);
router.post('/eliminar-producto-carrito', usuarioController.isLoggedIn, tiendaController.postEliminarProductoCarrito);

// Ruta general para productos
router.get('/:categoria?', usuarioController.isLoggedIn, tiendaController.getProductos);

module.exports = router;
