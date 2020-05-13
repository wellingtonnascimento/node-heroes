// npm install mongoose


// setTimeout(() => {
//     const state = connection.readyState;
//     console.log('state', state);
// }, 1000)

/*
        0: DIsconetado
        1: COnectaod
        2: conectando 
        3: disconectadno
*/

const heroisSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('herois', heroisSchema);

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('result', resultCadastrar);

    const listItens = await model.find();
    console.log('items', listItens)
};

main();