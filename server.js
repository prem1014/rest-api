// Dependencies
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var dbConnection=require('./app/db-connection/db-connection');

var loginCrude = require('./app/crud-operations/log-in/log-in');
var schoolCrude = require('./app/crud-operations/school-registration/school-rgistration');
var locationsCrude = require('./app/crud-operations/locations/locations');
var studentCrude = require('./app/crud-operations/students/students');
var teacherCrude = require('./app/crud-operations/teachers/teachers');
// Use connect method to connect to the server
var MongoClient=dbConnection.getMongoClient();
var url=dbConnection.getConnectionUrl();

// Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
var port = process.env.PORT || 8080;        // set our port

var router = express.Router();
// middleware to use for all requests

function setAcceptsHeader(req, res, next) {
    'use strict';

    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}

app.options('*', function (req, res) {
    'use strict';

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).end();
});

// more routes for our API will happen here

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/login')
    .get(setAcceptsHeader,function (req,res) {
        res.setHeader('Content-Type', 'application/json');
        MongoClient.connect(url, function(err, db) {
            loginCrude.getUserDetails(req,db,function(result){
                res.json(result);
                db.close();
            })
        });
    })
    .post(setAcceptsHeader,function(req,res){
        res.setHeader('Content-Type', 'application/json');
        MongoClient.connect(url, function(err, db) {
            console.log(req);
            console.log("Connected successfully to server");
            loginCrude.saveNewUserDetails(req,db, function(result) {
                res.json({message:'success'});
                db.close();
                console.log("Connection closed");
            });
        });
    });

router.route('/login/:id')
    .get(setAcceptsHeader,function(req,res){
        MongoClient.connect(url,function (err,db) {
            loginCrude.getUserById(req,db,function (result) {
                res.json(result);
                db.close();
            })
        });        
    })
    .delete(setAcceptsHeader,function(req,res){
        MongoClient.connect(url,function (err,db) {
            loginCrude.deleteUserDetails(req,db,function (result) {
                res.json({message:'success'});
                db.close();
            })
        });        
    })

router.route('/country')
    .get(setAcceptsHeader,function (req,res) {
        res.setHeader('Content-Type', 'application/json');
        MongoClient.connect(url,function (err,db) {
            locationsCrude.getCountry(req,db,function (result) {
                res.json(result);
                console.log(result);
                db.close();
            })
        });
    })
    .post(setAcceptsHeader,function (req,res) {
        res.setHeader('Content-Type', 'application/json');
        MongoClient.connect(url, function(err, db) {
            console.log("Connected successfully to server");
            locationsCrude.saveCountry(req,db, function(result) {
                res.json({message:'data saved'});
                db.close();
                console.log("Connection closed");
            });
        });
    });

router.route('/state')
    .post(setAcceptsHeader,function (req,res) {
        res.setHeader('Content-Type', 'application/json');
        MongoClient.connect(url, function(err, db) {
            locationsCrude.saveState(req,db, function(result) {
                res.json({message:'data saved'});
                db.close()
            });
        });
    });

router.route('/state/:countryId')
    .get(setAcceptsHeader,function (req,res) {
        MongoClient.connect(url,function (err,db) {
            locationsCrude.getStateByCountryId(req,db,function (result) {
                res.json(result);
                db.close();
            })
        });
    });

router.route('/district')
    .post(setAcceptsHeader,function (req,res) {
        res.setHeader('Content-Type', 'application/json');
        MongoClient.connect(url, function(err, db) {
            locationsCrude.saveDistrict(req,db, function(result) {
                res.json({message:'data saved'});
                db.close()
            });
        });
    });

router.route('/district/:stateId')
    .get(setAcceptsHeader,function (req,res) {
        MongoClient.connect(url,function (err,db) {
            locationsCrude.getDistrictByStateId(req,db,function (result) {
                res.json(result);
                db.close();
            })
        });
    });

router.route('/school')
    .get(setAcceptsHeader,function (req,res) {
        MongoClient.connect(url,function (err,db) {
            schoolCrude.getAllSchoolDetails(req,db,function (result) {
                res.json(result);
                db.close();
            })
        });
    })
    .post(setAcceptsHeader,function (req,res) {
        res.setHeader('Content-Type', 'application/json');
        MongoClient.connect(url, function(err, db) {
            schoolCrude.saveSchoolDetails(req,db, function(result) {
                res.json({message:'data saved'});
                db.close()
            });
        });
    });

router.route('/school/:schoolId')
    .get(setAcceptsHeader,function (req,res) {
        MongoClient.connect(url,function (err,db) {
            schoolCrude.getSchoolDetailsByID(req,db,function (result) {
                res.json(result);
                db.close();
            })
        });
    })
    .put(setAcceptsHeader,function(req,res){
         MongoClient.connect(url,function (err,db) {
            schoolCrude.updateSchoolById(req,db,function (result) {
                res.json({message:'success'});
                db.close();
            })
        })
    })
    .delete(setAcceptsHeader,function(req,res){
        MongoClient.connect(url,function (err,db) {
            schoolCrude.deleteSchoolById(req,db,function (result) {
                res.json({message:'success'});
                db.close();
            })
        })
    });

router.route('/student')
    .get(setAcceptsHeader,function(req,res){
        MongoClient.connect(url,function (err,db) {
            studentCrude.getStudentsDetails(req,db,function (result) {
                res.json(result);
                db.close();
            })
        });
    })
    .post(setAcceptsHeader,function (req,res) {
        res.setHeader('Content-Type', 'application/json');
        MongoClient.connect(url, function(err, db) {
            studentCrude.saveStudentDetails(req,db, function(result) {
                res.json({message:'success'});
                db.close();
            });
        });
    });

router.route('/student/:studentId')
    .get(setAcceptsHeader,function (req,res) {
        MongoClient.connect(url,function (err,db) {
            studentCrude.getStudentsDetailsById(req,db,function (result) {
                res.json(result);
                db.close();
            })
        });
    })
    .put(setAcceptsHeader,function(req,res){
         MongoClient.connect(url,function (err,db) {
            studentCrude.updateSchoolById(req,db,function (result) {
                res.json({message:'success'});
                db.close();
            })
        })
    })
    .delete(setAcceptsHeader,function(req,res){
        MongoClient.connect(url,function (err,db) {
            studentCrude.studentId(req,db,function (result) {
                res.json({message:'success'});
                db.close();
            })
        })
    });

router.route('/teacher')
    .get(setAcceptsHeader,function(req,res){
        MongoClient.connect(url,function (err,db) {
            teacherCrude.getTeachersDetails(req,db,function (result) {
                res.json(result);
                db.close();
            })
        });
    })
    .post(setAcceptsHeader,function (req,res) {
        res.setHeader('Content-Type', 'application/json');
        MongoClient.connect(url, function(err, db) {
            teacherCrude.saveTeacherDetails(req,db, function(result) {
                res.json({message:'success'});
                db.close();
            });
        });
    })

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);