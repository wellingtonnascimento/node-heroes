const assert = require('assert');
const Mongodb = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = {nome: 'Mulher Maravilha', poder:'Leço'};
const MOCK_HEROI_DEFAULT = {nome: `Homem Aranha-${Date.now()}`, poder:'Teia'};
const MOCK_HEROI_ATUALZAR= {nome: `Zaca urubu-${Date.now()}`, poder:'Malandro'};
let MOCK_HEROI_ID = '';
const context = new Context(new Mongodb());
describe('MongoDB Suite de teste', function() {
    this.beforeAll(async () => {
        await context.connect();
        await context.create(MOCK_HEROI_DEFAULT);
       const result = await context.create(MOCK_HEROI_ATUALZAR);
        MOCK_HEROI_ID = result._id;
       
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
    it('atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pica Pau'
        })
        assert.deepEqual(result.nModified, 1)
    })

    it('remover', async () => {
        const result = await context.delete(MOCK_HEROI_ID);
        assert.deepEqual(result.n, 1);
    })

})