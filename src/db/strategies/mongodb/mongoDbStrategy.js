const ICrud = require("./../interfaces/interfaceCrud");
const Mongoose = require("mongoose");
//const context = require('./db/strategies/base/contextStrategy')

const STAUS = {
	0: "Disconectado",
	1: "Conectado",
	2: "Conectando",
	3: "Disconectado"
};

class MongoDB extends ICrud {
	constructor(connection, schema) {
		super();
		this._connection = connection;
		this._collection = schema;
	}

	async isConnected() {
		const state = STATUS[this._connection.readyState];
		if (state === "Conectado") return state;
		if (state !== "Conectando ") return state;
		await new Promise(resolve => setTimeout(resolve, 1000));

		return STATUS[this._connection.readyState];
	}

	static connect() {
		Mongoose.connect(
			process.env.MONGODB_URL,
			{ useNewUrlParser: true },
			function(error) {
				if (!error) return;

				console.log("Falha na conexão com mongo DB!", error);
			}
		);

		const connection = Mongoose.connection;

		connection.once("open", () => console.log("database em execução"));

		return connection;
	}

	async create(item) {
		return this._collection.create(item);
	}

	async read(item = {}) {
		return this._collection.findOne(
			item,
			{
				username: 1,
				password: 1,
				name_intent: 1,
				intent: 1,
				response: 1,
				values: 1,
				insertedAt: 1,
				payload: 1,
				conversation_id: 1,
				id_user_local: 1,
				name_entity: 1,
				entity: 1
			},
			{ sort: { _id: -1 } }
		);
	}

	async buscar(item = {}) {
		return this._collection.find(
			item,
			{
				username: 1,
				password: 1,
				name_intent: 1,
				intent: 1,
				response: 1,
				values: 1,
				insertedAt: 1,
				payload: 1,
				conversation_id: 1,
				id_user_local: 1,
				name_entity: 1,
				entity: 1
			}
			//{ sort: { _id: -1 } }
		);
	}

	async update(id, item) {
		return this._collection.updateMany({ _id: id }, { $set: item });
	}

	async delete(id) {
		return this._collection.deleteOne({ _id: id });
	}
}

module.exports = MongoDB;
