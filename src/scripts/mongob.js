// docker ps

// sudo docker exec -it 14f7e8e0e3bb mongo -u wellington -p 123456 --authenticationDatabase herois

//Databases
// show dbs

// // mudando o contecnto para uma database
// use herois

// // mostrar tables(collections)
// show collections 




for(let i =0; i <= 500; i++){
    db.herois.insert({
        nome:`SubZebro-${i}`,
        poder:'Velocidade',
        dataNascimento: '1996-02-05'
    })
}

db.herois.findOne()
db.herois.count()
db.herois.find().limit(1000).sort({nome: -1})
db.herois.find({}, {poder: 1, _id: 0})

//create 
db.herois.insert({
    nome: 'Flash',
    pdoer: 'Velocidade',
    dataNascimento: '1998-02-05'
})

// read

db.herois.find()

db.herois.find().pretty()

// update

db.herois.update({_id: ObjectId("5ebc1d8fe62c58e2c2aaa72c")},
    {nome: 'Super Grils'})

db.herois.update({_id: ObjectId("5ebc1e6be62c58e2c2aace2d")},
{ $set:{nome: 'Lanterna Verde'}})

db.herois.update({poder: 'Velocidade'}
        ,{$set: {poder: 'super '}})

//delete 

db.herois.remove({nome:'Flash'})
//remove todos
db.herois.remove({})

