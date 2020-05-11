const ICrud = require('./interfaces/interfaceCrud');

class Postgres extends ICrud{
    constructor(){
        super()
    }
    isConnected(){
        
    }
    create(item){
        console.log('o item foi salvo em mongodb');
    }
}

module.exports = Postgres;