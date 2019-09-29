const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");

const AuthController = require("./../controllers/AuthController")
const failAction = (request, headers, erro) => {
  throw erro;
};

class AuthRoutes extends BaseRoute {
  login(key) {
    return {
      path: "/login",
      method: "POST",
      config: {
        auth: false,
        tags: ["api"],
        description: "Obter token",
        notes: "Faz login com user e senha",
        validate: {
          failAction,
          payload: {
            username: Joi.string().required(),
            password: Joi.string().required()
          }
        }
      },
      handler: async request =>  AuthController.login(request,key)
    };
  }
}

module.exports = AuthRoutes;
