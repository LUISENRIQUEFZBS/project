const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },  
    carrito: {
        items: [
        {
            idProducto: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
            cantidad: { type: Number, required: true }
        }
        ]
    }
});

usuarioSchema.methods.agregarAlCarrito = function(producto, cantidad) {
  if (!this.carrito) {
      this.carrito = { items: [] };
  }

  const indiceEnCarrito = this.carrito.items.findIndex(cp => {
      return cp.idProducto.toString() === producto._id.toString();
  });

  const itemsActualizados = [...this.carrito.items];

  if (indiceEnCarrito >= 0) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      itemsActualizados[indiceEnCarrito].cantidad += cantidad; // Suma la cantidad recibida
  } else {
      // Si no está en el carrito, añade el producto con la cantidad recibida
      itemsActualizados.push({
          idProducto: producto._id,
          cantidad: cantidad
      });
  }

  const carritoActualizado = {
      items: itemsActualizados
  };

  this.carrito = carritoActualizado;
  return this.save(); // Guarda el carrito actualizado
};
  
usuarioSchema.methods.deleteItemDelCarrito = function(idProducto) {
    const itemsActualizados = this.carrito.items.filter(item => {
      return item.idProducto.toString() !== idProducto.toString();
    });
    this.carrito.items = itemsActualizados;
    return this.save();
};
  
usuarioSchema.methods.clearCarrito = function() {
    this.carrito = { items: [] };
    return this.save();
};
  
module.exports = mongoose.model('Usuarios', usuarioSchema);