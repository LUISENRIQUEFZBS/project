const fs = require('fs');
const path = require('path');

const raizDir = require('../utils/path');
//const { fileLoader } = require('ejs');

const p = path.join(raizDir, 'data', 'carrito.json')

module.exports = class Carrito{
    static agregarProducto(id, precio){

        fs.readFile(p, (err, fileContent) => {
            let carrito = {productos: [], precioTotal: 0};
            if (!err) {
                carrito = JSON.parse(fileContent)
            }

            const indiceProductoExistente = carrito.productos.findIndex(prod => prod.id === id);

            const productoExistente = carrito.productos[indiceProductoExistente];
            let productoActualizado;
            //Si el producto existe
            if(productoExistente){
                //Incrementar la cantidad
                productoActualizado = {...productoExistente};
                productoActualizado.cantidad = productoActualizado.cantidad + 1;
                carrito.productos = [...carrito.productos];
                carrito.productos[indiceProductoExistente] = productoActualizado;
            //Si el producto no existe    
            }else{
                //Empezar la cantidad con 1 unidad
                productoActualizado = {id: id, cantidad: 1};
                carrito.productos = [...carrito.productos, productoActualizado];
            }
            carrito.precioTotal = carrito.precioTotal + +precio;
            fs.writeFile(p, JSON.stringify(carrito), err => {
                console.log(err);
            })
        })

    }
}