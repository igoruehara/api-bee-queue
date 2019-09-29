const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const SendController = require("../controllers/SendController");
const headers = Joi.object({
	authorization: Joi.string().required()
}).unknown();

class SendRoutes extends BaseRoute {
	create() {
		return {
			path: "/send",
			method: "POST",
			config: {
				auth: false,
				tags: ["api"],
				description: "Cria usuario",
				notes: "Cria",
				validate: {
					failAction: (request, headers, erro) => {
						throw erro;
					},
					payload: {
						teste: Joi.string()
							.required()
							.min(3)
							.max(999)
					}
				}
			},
			handler: async request => SendController.create(request)
		};
	}
}

module.exports = SendRoutes;
