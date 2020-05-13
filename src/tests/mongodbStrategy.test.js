const assert = require('assert');
const Mongodb = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new Mongodb());

describe('MongoDB Suite de teste', function() {
    this.beforeAll(async () => {
        await context.connect();
    })

    it('Verificar conexão', async () => {
        const result = await context.isConnected()
        console.log('result', result)
        const expected = 'Conectado';

        assert.deepEqual(result, expected)
    })
})