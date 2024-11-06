const express = require('express');
const router = express.Router();
const tiendaController = require('../controllers/tienda');
const isAuth = require('../middleware/is-auth');

// Rutas específicas primero para no enviar a la pagina de categorias
router.get('/pedidos',isAuth, tiendaController.getPedidos);
router.post('/crear-pedido',isAuth, tiendaController.postPedido);

router.get('/productos/:idProducto', tiendaController.getProducto); //detalles productos

router.get('/carrito',isAuth, tiendaController.getCarrito);
router.get('/api/carrito',isAuth, tiendaController.getCarritoAPI); // info para el carrito
router.post('/carrito',isAuth, tiendaController.postCarrito);
router.post('/eliminar-producto-carrito',isAuth, tiendaController.postEliminarProductoCarrito);

// Ruta general para productos
router.get('/:categoria?', tiendaController.getProductos);

module.exports = router;
