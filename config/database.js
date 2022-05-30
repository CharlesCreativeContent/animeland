// config/database.js
module.exports = {

    'url' : `mongodb+srv://${process.env.DATABASE-USERNAME}:${process.env.DATABASE-PASSWORD}@cluster0.vkd0p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    'dbName': 'anime'
};
