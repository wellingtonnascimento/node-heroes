const assert = require('assert');
const api = require('./../api');

describe('Suite de teste da API Heroes', function (){
    this.beforeAll(async () => {
        app = await api;
    })
    it('Listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        })
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    })
    it('listar /herois = deve retornar somente 3 resgistos', async () => {
        const TAMANHO_LIMIT =3;
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(dados.length === TAMANHO_LIMIT);
    })
    it('listar /herois = deve retornar um erro com limit incorreto por usar string', async () => {
        const TAMANHO_LIMIT ='AEE';
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })
        const erroResult = {
            "statusCode": 400,
            "error": "Bad Request",
            "message":"child \"limit\" fails because [\"limit\" must be a number]",
            "validation":{
                "source":"query",
                "keys":["limit"]
            }
        }
        assert.deepEqual(result.statusCode, 400)
        assert.deepEqual(result.payload, JSON.stringify(erroResult));
    })

    it('listar /herois = deve filtrar um item', async () => {
        const TAMANHO_LIMIT =1000;
        const NAME = 'Homem Aranha-1589397805677'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(dados[0].nome === NAME);
    })
})