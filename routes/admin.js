const express = require('express');

const router = express.Router();

const usuarioController= require('../controllers/usuario')
const adminController= require('../controllers/admin')

// /admin/productos
router.get('/crear-producto', usuarioController.isLoggedIn, adminController.getCrearProducto);
router.post('/crear-producto', usuarioController.isLoggedIn, adminController.postCrearProducto);

router.get('/productos', usuarioController.isLoggedIn, adminController.getProductos);

router.get('/editar-producto', usuarioController.isLoggedIn, adminController.getProductos);
// router.post('/edit-producto', usuarioController.isLoggedIn, adminController.getProductos);

module.exports = router;
