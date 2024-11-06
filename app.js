const path = require('path');
const express = require('express');

const raizDir = require('./utils/path');

const bodyParser = require('body-parser')
const csrf = require('csurf');
const flash = require('connect-flash');

// mongoose 
const mongoose = require('mongoose');  

// Cookies
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = 'mongodb+srv://luisvilameza:secreto@cluster0.wn91f.mongodb.net/nuevaDB?retryWrites=true&w=majority&appName=Cluster0';
// from class 

const Usuario = require('./models/usuario');
const ecommerceRouter = require('./routes/ecommerce')
const errorController = require('./controllers/error');


const adminRouter = require('./routes/admin');

const authRoutes = require('./routes/auth');

const Categoria = require('./models/categoria');


const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(raizDir, 'public')));
app.use(session({ secret: 'algo muy secreto', resave: false, saveUninitialized: false, store: store }));

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  console.log(req.session);
  if(!req.session.usuario){
    return next();
  }
  Usuario.findById(req.session.usuario._id)
    .then(usuario => {
      console.log(usuario)
      req.usuario = usuario;
      next();
    })
    .catch(err => console.log(err));

});

app.use((req, res, next) => {
  Categoria.find()
    .then(categorias => {
      if (!categorias || categorias.length === 0) {
        console.log("No se encontraron categorías");
        return res.status(404).send("No se encontraron categorías");
      }
      req.categorias = categorias;
      next();
    })
    .catch(err => {
      console.log("Error al buscar categorías:", err);
    });
});

app.use((req, res, next) => {
  res.locals.autenticado = req.session.autenticado;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRouter);
app.use(authRoutes); // antes para envitar problemas
app.use(ecommerceRouter);

app.use(errorController.get404);

const port=3000;

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log(result);
    Categoria.find().then(result => {
      if (result.length === 0) { // Verifica si el array está vacío
        console.log('No hay categorías, creando categorías por defecto...');
        
        const categorias = [
          { categoriaName: 'Mobil' , categoriaRuta: 'mobile'},
          { categoriaName: 'TV & Audio', categoriaRuta: 'tv_audio'},
          { categoriaName: 'Electrodomésticos', categoriaRuta: 'electrodomesticos'},
          { categoriaName: 'Tecnología AI', categoriaRuta: 'tecnologia_ai'},
          { categoriaName: 'Ventas Especiales', categoriaRuta: 'ventas_especiales'}
        ];

        Categoria.insertMany(categorias)
          .then(() => console.log("Categorías creadas exitosamente"))
          .catch(err => console.log("Error al crear categorías:", err));
      }
    });
    Usuario.findOne().then(usuario => {
        if (!usuario) {
          const usuario = new Usuario({
            nombres: 'Luis',
            apellidos: 'Vila',
            email: 'luisvilameza@gmail.com',
            password: '123',
            isAdmin: false,
            carrito: {
              items: []
            }
          });
          usuario.save();
        }
      });
    app.listen(port, (e) => { console.log(`...running port ${port}`) });
  })
  .catch(err => {
    console.log(err);
  });