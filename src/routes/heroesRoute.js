const BaseRoute = require ('./base/baseRoute');

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super();
        this.db =db;
    }

    list(){
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) =>{
                try{
                    const {
                        skip,
                        limit,
                        nome} = request.query
                    console.log('limit', limit);

                    let query = {};
                    if(nome){
                        query.nome = nome;
                    }
                    if(isNaN(skip))
                        throw Error('O Tipo do skip e incorreto');
                    if(isNaN(limit))
                        throw Error('O Tipo do limit e incorreto');
                                   
                    return this.db.read(query, parseInt(skip), parseInt(limit))
                }catch(error){
                    console.log('DEU RUIM', error)
                    return "Erro interno no servidor"
                }
            }
        }
    }

}

module.exports = HeroRoutes;
