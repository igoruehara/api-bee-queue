const Boom = require("boom");
const BaseRoute = require("./../routes/base/baseRoute")
const Jwt = require("jsonwebtoken");
const PasswordHelper = require("./../helpers/passwordHelper");
const Context = require("./../db/strategies/base/contextStrategy");
const UsuarioSchema = require("./../db/strategies/mongodb/schemas/usuarioSchema")
const MongoDb = require("./../db/strategies/mongodb/mongoDbStrategy");

class AuthController extends BaseRoute  {
    constructor(key) {
        key = process.env.JWT_SECRET
        super();
        this.secret = key;    
      }
  
async login(request){

    let { username, password } = request.payload;

    const connection = MongoDb.connect();
    const db = new Context(new MongoDb(connection, UsuarioSchema));


    let user = await db.read({
      username: username
    });


    let id = undefined
    if(user && user._id){
      id = user._id;
    }
   

    if (!user) {
      return Boom.unauthorized("O usuario informado nao existe");
    }

    let match = await PasswordHelper.comparePassword(
      password,
      user.password
    );

    if(password.toString() === user.password.toString()){
      match = true
    }

    if (!match) {
      return Boom.unauthorized("Usuário ou senha inválido");
    }

    return {
      token: Jwt.sign(
        {
          username: username
        },
        this.secret
      ),
      id: id
    };
  }

}


module.exports = new AuthController()