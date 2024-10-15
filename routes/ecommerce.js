const path = require('path');

const express = require('express');

const raizDir = require('../utils/path');


const router = express.Router();
const usuarioController= require('../controllers/usuarioController')

const productos = [{id:1,nombre:'Galaxy S24 Ultra 1TB de S/7,149 a S/5,999*',src:"https://images.samsung.com/is/image/samsung/assets/pe/2024/landing/galaxy-blue-cel.png?$448_N_PNG$"},
                    {id:2,nombre:'¡Ahora con AI! Galaxy A55 128GB a S/1,399*',src:"https://images.samsung.com/is/image/samsung/assets/pe/2024/landing/Framvdfvd269.png?$448_N_PNG$"},
                    {id:3,nombre:'Galaxy S24 256GB de S/4,199 a S/3,049*',src:"https://images.samsung.com/is/image/samsung/assets/pe/2024/landing/S24BLUE789.png?$448_N_PNG$"}];

router.get('/', usuarioController.isLoggedIn, (req, res, next) => {
    res.render('bienvenida', {prods: productos, titulo: 'bienvenida', path: '/',user:  res.locals.user? res.locals.user:null });
});

// GET requiere una coincidencia exacta en la ruta
router.get('/login', usuarioController.isLoggedIn, (req, res, next) => {
    res.render('login-usuario', { titulo: 'Inicio de seción del cliente', path: '/' });
});
router.get('/signup', usuarioController.isLoggedIn, (req, res, next) => {
    res.render('signup-usuario', { titulo: 'Creación de nueva cuenta', path: '/' });
});

module.exports = router;
