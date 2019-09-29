const Boom = require("boom");
const BaseRoute = require("./../routes/base/baseRoute");
const Context = require("./../db/strategies/base/contextStrategy");
const UsuarioSchema = require("./../db/strategies/mongodb/schemas/usuarioSchema");
const MongoDb = require("./../db/strategies/mongodb/mongoDbStrategy");
//const passwordHelper = require("./../helpers/passwordHelper")

class UsuarioController extends BaseRoute {
	constructor() {
		super();
		const connection = MongoDb.connect();
		const db = new Context(new MongoDb(connection, UsuarioSchema));
		this.db = db;
	}

	async list(request, headers) {
		try {
			const { skip, limit, username, password } = request.query;

			const query = username ? { username: { $regex: `.*${username}*.` } } : {};

			return this.db.read(query, parseInt(skip), parseInt(limit));
		} catch (error) {
			console.log("Erro para listar", error);

			return Boom.internal();
		}
	}

	async create(request) {
		try {
			const { username, password } = request.payload;
			//const pass = await passwordHelper.hashPassword(password);
			//const user = await passwordHelper.hashPassword(username);

			const pass = password;
			const user = username;

			const result = await this.db.create({ username: user, password: pass });
			return {
				message: "Usuário cadastrado com sucesso!",
				_id: result._id
			};
		} catch (error) {
			console.log("Deu ruim", error);
			return Boom.internal();
		}
	}

	async update(request) {
		try {
			const { id } = request.params;
			const { payload } = request;
			const dadosString = JSON.stringify(payload);
			const dados = JSON.parse(dadosString);

			const result = await this.db.update(id, dados);

			if (result.nModified !== 1)
				return {
					message: "Não foi possivel atualizar"
				};

			return { message: "dado atualizado com sucesso!" };
		} catch (error) {
			console.error("Deu ruim para atualizar os dados", error);
			return Boom.internal();
		}
	}

	async delete(request) {
		try {
			const { id } = request.params;
			const result = await this.db.delete(id);

			if (result.n !== 1)
				return {
					message: "Não foi possivel remover o item"
				};

			return {
				message: "Item removido com sucesso"
			};
		} catch (error) {
			console.error("Deu ruim ao deletar", error);
			return Boom.internal();
		}
	}
}

module.exports = new UsuarioController();
