const ICrud = require('./interfaces/interfaceCrud');

class MongoDB extends ICrud{
    constructor(){
        super();
    }

    create(item){
        console.log('O item salvo mongo db');
    }
}

module.exports =MongoDB;