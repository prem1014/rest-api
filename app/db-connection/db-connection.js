/**
 * Created by prem on 2/3/2017.
 */

module.exports = {
    getMongoClient: function () {
        var mongoClient = require('mongodb').MongoClient
            , assert = require('assert');
        return mongoClient;
    },
    getConnectionUrl: function () {
        return 'mongodb://localhost:27017/test';
    }
};
