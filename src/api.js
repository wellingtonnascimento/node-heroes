// npm i hapi
// npm i vision inert hapi-swagger
const {config} = require('dotenv');
const {join} = require('path');
const {ok} = require('assert')

const env = process.env.NODE_ENV || "dev";
ok(env === "prod" || env === "dev", "a env é invalida, ou dev ou prod ");

const configPath = join('./config', `.env.${env}`)
config({
    path:configPath
})

const Hapi = require('hapi');
const Context = require('./db/strategies/base/contextStrategy');
const MongoDb = require('./db/strategies/mongodb/mongoDbStrategy');

const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const HeroRoute = require('./routes/heroesRoute');

const AuthRoute = require('./routes/authRoutes');
const Postgres = require('./db/strategies/postgres/postgresSQLStrategy')
const UserSchame = require('./db/strategies/postgres/schemas/userSchame')

const UtilRoutes = require('./routes/utilRoutes');

const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');
const HapiJwt = require('hapi-auth-jwt2');
const JWT_SECRET = process.env.JWT_KEY;

const swaggerConfig = {
    info: {
        title: 'API Herois',
        version: 'v1.0'
    },
    lang: 'pt'

}

const app = new Hapi.server({
    port: process.env.PORT
});

function mapRoutes(instance, methods) {

    return methods.map(method => instance[method]());

}

async function main() {
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection, HeroiSchema));

    const connectionPostgres = await Postgres.connect();
    const model = await Postgres.defineModel(connectionPostgres, UserSchame);
    const contextPostgres = new Context(new Postgres(connectionPostgres, model));


    await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerConfig

        }
    ]);

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn: 20
        // },
        validate: async(dado, request) => {
            const [result] = await contextPostgres.read({
                username: dado.username.toLowerCase()
            })
            if (!result) {
                return {
                    isValid: false
                }
            }
            return {
                isValid: true
            }
        }
    });
    app.auth.default('jwt')
    app.route([
        ...mapRoutes(new UtilRoutes(), UtilRoutes.methods()),
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostgres), AuthRoute.methods()),
 
    ])

    await app.start();
    console.log('server running at', app.info.port);

    return app;
}

module.exports = main();