

const path = require('path');
const express = require('express');

const raizDir = require('../utils/path');
const ecommerceData = require('./ecommerce');
const usuarioController= require('../controllers/usuarioController')

const router = express.Router();

router.post('/login', usuarioController.login);
router.get('/logout', usuarioController.logout);
router.post('/signup', usuarioController.signup);

module.exports = router;
// exports.usuarios = usuarios;
