const { config } = require("dotenv");
const { join } = require("path");
const { ok } = require("assert");
const env = process.env.NODE_ENV || "dev";
ok(env == "prod" || env == "dev", "A .env é inválida ambiente de DEV ou PROD");

const configPath = join(__dirname, "./config", `.env.${env}`);
config({
	path: configPath
});

console.log("CAMINHO DA PASTA", __dirname);

const Hapi = require("@hapi/hapi");
const UsuarioRoute = require("./src/routes/usuarioRoutes");
const AuthRoute = require("./src/routes/authRoutes");
const HappiSwagger = require("hapi-swagger");
const Vision = require("vision");
const Inert = require("inert");
const HapiJwt = require("hapi-auth-jwt2");
const HapiAuthCookie = require("hapi-auth-cookie");
const UtilRoutes = require("./src/routes/utilRoutes");
const SendRoute = require("./src/routes/sendRoutes");

const JWT_SECRET = process.env.JWT_SECRET;
const app = new Hapi.Server({
	port: process.env.PORT,
	routes: {
		security: true,

		payload: { maxBytes: 55555555 },
		cors: {
			origin: ["*"],
			credentials: true,
			additionalHeaders: [
				"Access-Control-Allow-Origin",
				"Access-Control-Request-Method",
				"Access-Control-Allow-Credentials",
				"Allow-Origin",
				"Origin",
				"cache-control",
				"x-requested-with",
				"Access-Control-Allow-Headers"
			]
		}
	}
});

app.state("data", {
	ttl: 365 * 24 * 60 * 60 * 1000,
	encoding: "base64json",
	isSecure: false,
	isHttpOnly: false,
	ignoreErrors: false,
	isSameSite: false,
	clearInvalid: false, // remove invalid cookies
	strictHeader: true // don't allow violations of RFC 6265
});

function mapRoutes(instance, methods) {
	return methods.map(method => instance[method]()); // pegar dinamicamente o nome dos metodos ex: [list,create,update]
}

async function main() {
	const swaggerOptions = {
		info: {
			title: "APIs Operadoras Cliente",
			version: "v1.0"
		},
		lang: "pt"
	};
	const health = require("hapi-and-healthy");
	await app.register([
		HapiJwt,
		Vision,
		Inert,
		HapiAuthCookie,
		//Cors,
		health,
		{
			plugin: HappiSwagger,
			options: swaggerOptions
			//options:{ origins: ['*']}
		}
	]);

	app.auth.strategy("jwt", "jwt", {
		key: JWT_SECRET,
		//  options:{
		//      expiresIn: 20
		//  }
		validate: async (dado, request) => {
			//verifica no banco se o usuário continua ativo
			const result = await contextUsers.read({
				username: dado.username.toLowerCase(),
				id: dado.id
			});

			if (!result) {
				return {
					isValid: false
				};
			} else {
				return {
					isValid: true
				};
			}
		}
	});

	app.auth.default("jwt");
	app.route([
		...mapRoutes(new UsuarioRoute(), UsuarioRoute.methods()),
		...mapRoutes(new AuthRoute(), AuthRoute.methods()),
		...mapRoutes(new UtilRoutes(), UtilRoutes.methods()),
		...mapRoutes(new SendRoute(), SendRoute.methods())
	]);

	await app.start();

	console.log("Servidor rodando na porta", app.info.port);

	return app;
}

module.exports = main();
