const Mongoose = require('mongoose')

const usuarioSchema = new Mongoose.Schema({
    username: {
        type: String,
        unique:true,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    insertedAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = Mongoose.models.usuario || Mongoose.model('usuario', usuarioSchema)