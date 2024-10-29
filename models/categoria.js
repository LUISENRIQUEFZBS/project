const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    categoriaName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Categorias', categoriaSchema);