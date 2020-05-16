const { equal, deepEqual, ok } = require('assert');
const Postgres = require('../db/strategies/postgres/postgres');
const HeroiSchema = require('../db/strategies/postgres/schemas/heroiSchema');
const Context = require('../db/strategies/base/contextStrategy');
const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'flexas' };
const MOCK_HEROI_ATUALIZAR = { nome: 'Mulher Gavião', poder: 'grito' };


// 1o criar pasta postgres
// 2o criar schema heroiSchema
// 3o alterar classe postgres
  // constructor
  // defineModel
  // isConnected
  // connection
  // alterar _herois para _schema

// 4o alterar teste
  //adicionar connect
  // adicionar defineModel
  // adicionar context
// testar

let context = {};
describe('Postgres Strategy', function(){
    this.timeout(Infinity)
    before(async () =>{
        const connection = await Postgres.connect();
        const model = await Postgres.defineModel(connection, HeroiSchema);
        context = new Context(new Postgres(connection, model));
        
        
        await context.delete();
        await context.create(MOCK_HEROI_CADASTRAR);
        await context.create(MOCK_HEROI_ATUALIZAR);
    });
    it('PostgresSQL Connection', async () =>{
        const result = await context.isConnected();
        equal(result, true);
    });
    it('Cadastrar', async () =>{
        const result = await context.create(MOCK_HEROI_CADASTRAR);
        delete result.id;
        deepEqual(result, MOCK_HEROI_CADASTRAR);
    });
    it('listar', async () =>{
        const [result] = await context.read(MOCK_HEROI_CADASTRAR);
        delete result.id;
        deepEqual(result, MOCK_HEROI_CADASTRAR);
    });
    it('atualizar', async () =>{
    const [result] = await context.read({});
    const novoItem = {
      ...MOCK_HEROI_CADASTRAR,
      nome: 'Mulher Maravilha',
    };
    const [update] = await context.update(result.id, novoItem);

    deepEqual(update, 1)
    })
    it('remover por id', async () =>{
        const [item] = await context.read({});
        const result = await context.delete(item.id);
        deepEqual(result, 1 );
    })
})