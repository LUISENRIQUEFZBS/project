const fs = require('fs');
const path = require('path');

const raizDir = require('../utils/path.js');
const p = path.join(raizDir, 'data', 'productos.json');

const getProductosFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            console.error('No se pudo leer el archivo de productos.');
            cb([]);
        } else {
            cb(JSON.parse(fileContent)); // Convierte los datos del archivo a legibles
        }
    });
}

module.exports = class Producto {
    constructor(nombreproducto, urlImagen, descripcion, precio, id) {
        this.nombreproducto = nombreproducto;
        this.urlImagen = urlImagen;
        this.descripcion = descripcion;
        this.precio = precio;
        this.id = id; // Nuevo atributo id
    }

    save() {
        getProductosFromFile(productos => {
            if (!this.id) {
                // Genera un nuevo ID
                this.id = (productos.length + 1).toString(); // Incrementa el ID basado en la longitud del array
            }
            productos.push(this);
            fs.writeFile(p, JSON.stringify(productos), (err) => { // Convierte a JSON para guardar
                if (err) {
                    console.error('No se pudo guardar el producto.');
                }
            });
        });
    }

    static fetchAll(cb) {
        return getProductosFromFile(cb);
    }

    static findById(id, cb) {
        getProductosFromFile(productos => {
            const producto = productos.find(p => p.id === id); // Busca el producto por ID
            cb(producto);
        });
    }

    static update(id, updatedData, cb) {
        getProductosFromFile(productos => {
            const productoIndex = productos.findIndex(p => p.id === id);
            if (productoIndex >= 0) {
                // Si no hay nueva URL de imagen, mantén la existente
                const productoActual = productos[productoIndex];
                const updatedProducto = {
                    ...productoActual,
                    ...updatedData,
                    urlImagen: updatedData.urlImagen || productoActual.urlImagen // Mantener la imagen actual si no hay nueva
                };
                productos[productoIndex] = updatedProducto; // Actualiza el producto
                fs.writeFile(p, JSON.stringify(productos), err => {
                    if (err) {
                        console.error('No se pudo guardar el producto.');
                        cb(null);
                    } else {
                        cb(updatedProducto);
                    }
                });
            } else {
                cb(null); // Producto no encontrado
            }
        });
    }
    
}
