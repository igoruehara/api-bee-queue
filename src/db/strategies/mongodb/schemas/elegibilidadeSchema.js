const Mongoose = require('mongoose')

const elegibilidadeSchema = new Mongoose.Schema({
    payload: {
        type: Array,
        unique: false
        },
    insertedAt: {
        type: Date,
        index:true,
        default: new Date()        
    }
})

module.exports = Mongoose.models.elegibilidade || Mongoose.model('elegibilidade', elegibilidadeSchema)