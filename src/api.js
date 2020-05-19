// npm i hapi
// npm i vision inert hapi-swagger
const Hapi = require('hapi');
const Context = require('./db/strategies/base/contextStrategy');
const MongoDb = require('./db/strategies/mongodb/mongoDbStrategy');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const HeroRoute = require('./routes/heroesRoute');
const AuthRoute = require('./routes/authRoutes');

const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');

const HapiJwt = require('hapi-auth-jwt2');
const JWT_SECRET ='SEGREDO__1356';

const swaggerConfig = {
    info: {
        title: 'API Herois',
        version: 'v1.0'
    },
    lang: 'pt'

}

const app = new Hapi.server({
    port: 4000
});

function mapRoutes(instance, methods){

    return methods.map(method=> instance[method]());

}

async function main() {
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection, HeroiSchema));

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
        validate: (dado, request) => {
            return {
                isValid: true
            }
        }
    });
    app.auth.default('jwt')
    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods())
    ])

    await app.start();
    console.log('Servidor rodando na porta', app.info.port);

    return app;
}

module.exports = main();