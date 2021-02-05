## Postgres

docker run \
    --name postgresJSExpert\
    -e POSTGRES_USER=rapzadev\
    -e POSTGRES_PASSWORD=rapzadevPostgres\
    -e POSTGRES_DB=heroes\
    -p 5434:5432\
    -d postgres

docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgresJSExpert:postgres \
    -d \
    adminer

## MongoDB

docker run \
    --name mongoJSExpert \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=rapzadevAdmin \
    -d \
    mongo:4

docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongoJSExpert:mongodb \
    -d \
    mongoclient/mongoclient

docker exec -it mongoJSExpert \
    mongo --host localhost -u admin -p rapzadevAdmin -- authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createUser({user: 'rapzadev', pwd: 'rapzadevAdmin', roles: [{role: 'readWrite', db: 'heroes' }]})"


