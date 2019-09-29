const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const UsuarioController = require("./../controllers/UsuarioController")
const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown()

class UsuarioRoutes extends BaseRoute {

  list() {
    return {
      path: "/usuario",
      method: "GET",
      config: {
        tags: ["api"],
        auth: false,
        description: "Lista de usuários",
        notes: "Lista",
        validate: {
          failAction: (request, headers, erro) => {
            throw erro;
          },
          query: {
            skip: Joi.number()
              .integer()
              .default(0),
            limit: Joi.number()
              .integer()
              .default(10),
            username: Joi.string()
              .min(3)
              .max(100),
            password: Joi.string()
              .min(3)
              .max(100)
          }
        }
      },
      handler: (request, headers) => UsuarioController.list(request, headers)
    };
  }

  create() {
    return {
      path: "/usuario",
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
            username: Joi.string()
              .required()
              .min(3)
              .max(100),
            password: Joi.string()
              .required()
              .min(3)
              .max(100)
          }
        }
      },
      handler: async request => UsuarioController.create(request)
    };
  }

  update() {
    return {
      path: "/usuario/{id}",
      method: "PATCH",
      config: {
        auth: false,
        tags: ["api"],
        description: "Altera os users",
        notes: "Altera",
        validate: {
          failAction: (request, headers, erro) => {
            throw erro;
          },
          params: {
            id: Joi.string().required()
          },
          payload: {
            username: Joi.string()
              .min(3)
              .max(100),
            password: Joi.string()
              .min(2)
              .max(100)
          }
        }
      },
      handler: async request => UsuarioController.update(request)
    };
  }

  delete() {
    return {
      path: "/usuario/{id}",
      method: "DELETE",
      config: {
        auth: false,
        tags: ["api"],
        description: "Deleta os usuários no banco de dados",
        notes: "Deleta os users no BD",
        validate: {
          failAction: (request, headers, erro) => {
            throw erro;
          },
          params: {
            id: Joi.string().required()
          }
        }
      },
      handler: async request => UsuarioController.delete(request)
    };
  }
}

module.exports = UsuarioRoutes;
