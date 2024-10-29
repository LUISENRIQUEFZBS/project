const path = require('path');

const express = require('express');

const raizDir = require('./utils/path');

const bodyParser = require('body-parser')

// cookieParser
const cookieParser= require('cookie-parser')
// from class


// mongoose 
const mongoose = require('mongoose');   

//from project
const usuarioRouter = require('./routes/usuario')

const Usuario = require('./models/usuario');
const ecommerceRouter = require('./routes/ecommerce')
const errorController = require('./controllers/error');


const adminRouter = require('./routes/admin');
const Categoria = require('./models/categoria');


const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(raizDir, 'public')));

app.use((req, res, next) => {
  Usuario.findById('672051943368c2ab59205b28')
      .then(usuario => {
          // console.log(usuario)
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


// cookie parser
app.use(cookieParser())

app.use('/admin', adminRouter);

app.use('/usuario',usuarioRouter)
app.use(ecommerceRouter);



app.use(errorController.get404);

const port=3000;

mongoose
  .connect(
    'mongodb+srv://luisvilameza:secreto@cluster0.wn91f.mongodb.net/nuevaDB?retryWrites=true&w=majority&appName=Cluster0'
  )
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