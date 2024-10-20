const express = require('express');

const router = express.Router();
const usuarioController= require('../controllers/usuario')
const productosController= require('../controllers/productos')

router.get('/:categoria?', usuarioController.isLoggedIn, productosController.getProductos);

router.get('/productos/:idProducto', productosController.getProducto);

module.exports = router;
