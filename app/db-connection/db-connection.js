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
        /*var url = 'mongodb://localhost:27017/test';*/
        var url = 'mongodb://nrf_db:nrf@ds141434.mlab.com:41434/nrf';
        return url;
    }
};
