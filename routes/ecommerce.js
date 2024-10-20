const path = require('path');

const express = require('express');

const raizDir = require('../utils/path');

const router = express.Router();
const usuarioController= require('../controllers/usuario')
const productosController= require('../controllers/productos')

router.get('/', usuarioController.isLoggedIn, productosController.getProductosBienvenido);
router.get('/mobile', usuarioController.isLoggedIn, productosController.getProductosMobile);
router.get('/tv-audio', usuarioController.isLoggedIn, productosController.getProductosTvaudio);
router.get('/electrodomesticos', usuarioController.isLoggedIn, productosController.getProductosElectrodomesticos);
router.get('/tecnologia-ai', usuarioController.isLoggedIn, productosController.getProductosTecnologiaai);
router.get('/ventas-especiales', usuarioController.isLoggedIn, productosController.getProductosVentasespeciales);
router.get('/carrito', usuarioController.isLoggedIn, productosController.getCarrito);
router.post('/carrito', usuarioController.isLoggedIn, productosController.postCarrito)

module.exports = router;
