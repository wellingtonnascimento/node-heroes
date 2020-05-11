//instal imagem postgres
    sudo docker run \
     --name postgres \
     -e POSTGRES_USER=wellington \
     -e POSTGRES_PASSWORD=123456 \
     -e POSTGRES_DB=heroes \
     -p 5432:5432 \
     -d \
     postgres

//cliente postgress
    sudo docker run \
        --name adminer \
        -p 8080:8080 \
        --link postgres:postgres \
        -d \
        adminer

//instal imagem mongodb
     docker run \
     --name mongodb \
     -p 27017:27017 \
     -e MONGO_INITDB_ROOT_USERNAME=admin \
     -e MONGO_INITDB_ROOT_PASSWORD=123456 \
     -d \
     mongo:4 
//CLiente MOngo
      docker run \
      --name mongoclient \
      -p 3000:3000 \
      --link mongodb:mongodb \
      -d \
      mongoclient/mongoclient:4.0.0

docker exec -it mongodb \
      mongo --host localhost -u admin -p 123456 --authenticationDatabase admin \
      --eval "db.getSiblingDB('herois').createUser({user: 'wellnigton', pwd: '123456', roles: [{role: 'readWrite', db: 'herois'}]})"


    //listar containers ativos 
    docker ps 

    //listar todos cantainer
    docker ps -a

    //entra no container
    docker exec -it postgres /bin/bash

    // Iniciao Imagem
    docker start id_ou_nome_da_imagem
