//npm install mongoose
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongoDbStrategy') // mongoDB
const HeroesSchema = require('./db/strategies/mongodb/schemas/heroesSchema')
const Mongoose = require('mongoose')

Mongoose.connect('mongodb://igoruehara:minhasenhateste@localhost:27017/heroes',
    { useNewUrlParser: true }, function (error) {
        if (!error) return;

        console.log("Falha na conexão!", error)
    })

const connection = Mongoose.connection
connection.once('open', () => console.log('database em execução'))

const heroesSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },

    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('heroes', heroesSchema)

async function main() {
    const listItens = await model.find()

    console.log("Herois listados", listItens)
}
main()