const express = require('express');

const router = express.Router();
const usuarioController= require('../controllers/usuario')
const tiendaController = require('../controllers/tienda')

router.get('/carrito', usuarioController.isLoggedIn, tiendaController.getCarrito);
router.get('/api/carrito', usuarioController.isLoggedIn, tiendaController.getCarritoAPI); // info para el carrito
router.post('/carrito', usuarioController.isLoggedIn, tiendaController.postCarrito)
router.post('/eliminar-producto-carrito', usuarioController.isLoggedIn, tiendaController.postEliminarProductoCarrito);
router.get('/:categoria?', usuarioController.isLoggedIn, tiendaController.getProductos);

router.get('/productos/:idProducto', tiendaController.getProducto);

router.get('/pedidos', tiendaController.getPedidos);

router.post('/crear-pedido', tiendaController.postPedido);

module.exports = router;