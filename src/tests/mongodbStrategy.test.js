const assert = require('assert');
const Mongodb = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = {nome: 'Mulher Maravilha', poder:'Leço'};
const MOCK_HEROI_DEFAULT = {nome: `Homem Aranha-${Date.now()}`, poder:'Teia'};
const context = new Context(new Mongodb());

describe('MongoDB Suite de teste', function() {
    this.beforeAll(async () => {
        await context.connect();
        await context.create(MOCK_HEROI_DEFAULT);
    })

    it('Verificar conexão', async () => {
        const result = await context.isConnected()
        console.log('result', result)
        const expected = 'Conectado';

        assert.deepEqual(result, expected)
    })
    it('cadastrar', async () => {
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR);
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async () =>{
        
        const [{nome,poder}] = await context.read({nome: MOCK_HEROI_DEFAULT.nome});
        const result = {nome, poder};

        assert.deepEqual(result, MOCK_HEROI_DEFAULT);

    })
})