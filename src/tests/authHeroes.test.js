const assert = require('assert')
const api = require('../api')
const Context = require('../db/strategies/base/contextStrategy');
const Postgres = require('../db/strategies/postgres/postgresSQLStrategy');
const UserSchame = require('../db/strategies/postgres/schemas/userSchame');

let app = {}

const USER = {
   
        username: 'xuxadasilva',
        password: '123'
    
}

const USER_DB = {
    ...USER,
    password: '$2b$04$DkF1V8pTZTiZPGjNcBTE8uLT4xSYKBrReThGENlbgIq7tbPsxMHt.'
}

describe('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api;

        const connetionPostgres = await Postgres.connect();
        const model = await Postgres.defineModel(connetionPostgres, UserSchame);
        const postgres = new Context(new Postgres(connetionPostgres, model))
        await postgres.update(null, USER_DB,true);

    })
    it('deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        });
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(JSON.parse(result.payload).token.length > 10)
    })

    it('deve retornar não autorizado ao tentar obter um token com login errado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'wellington',
                password: '123'
            }
        });
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(JSON.parse(result.payload).error, "Unauthorized")
    })

    
})