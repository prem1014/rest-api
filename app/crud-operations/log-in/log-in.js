/**
 * Created by prem on 2/3/2017.
 */
module.exports={
    saveNewUserDetails:function (req,db,callback) {
        var collection = db.collection('userDetails');
        collection.insert(
            {
                userName:req.body.userName,
                userId:req.body.userId,
                password:req.body.password,
                userType:req.body.userType
            },
            function (err,result) {
                callback(result)
            }
        );
        return callback;
    },
    getUserDetails:function (req,db,callback) {
        console.log('db:'+db);
        var collection = db.collection('userDetails');
        collection.find({}).toArray(function (err, userDetails) {
            console.log("Found the following records");
            console.log(userDetails);
            callback(userDetails);
        });
    }
};
