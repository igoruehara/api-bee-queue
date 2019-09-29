const Boom = require("boom");
const BaseRoute = require("../routes/base/baseRoute");
const Queue = require("../queue/Queue");
const SendEmailJob = require("../jobs/SendEmailJob");

class SendController extends BaseRoute {
	constructor() {
		super();
		// const connection = MongoDb.connect();
		// const db = new Context(new MongoDb(connection, UsuarioSchema));
		// this.db = db
	}

	async create(request) {
		try {
			const { teste } = request.payload;
			const result = await Queue.add(SendEmailJob.key, {
				teste: teste
			});

			return result;
		} catch (error) {
			console.log("Deu ruim", error);
			return Boom.internal();
		}
	}
}

module.exports = new SendController();
