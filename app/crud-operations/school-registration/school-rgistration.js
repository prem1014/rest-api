/**
 * Created by prem on 2/4/2017.
 */
module.exports={
    saveSchoolDetails:function (req,db,callback) {
        var collection = db.collection('schoolDetails');

        collection.insert({
            schoolName:req.body.schoolName,
            cityName:req.body.cityName,
            districtName:req.body.districtName,
            stateName:req.body.stateName,
            countryName:req.body.countryName,
            pinCode:req.body.pinCode,
            mobileNo:req.body.mobileNo,
            emailId:req.body.emailId,
            _id:req.body.schoolUID,
            message:req.body.message,
            currentStatus:'pending'
        },
            function (err,result) {
                callback(err,result)
            }
        );
    },
    getAllSchoolDetails:function (req,db,callback) {
        var collection=db.collection('schoolDetails');

        collection.find({}).toArray(function (err,schoolDetails) {
            console.log('school details:'+schoolDetails)
            callback(schoolDetails);
        })
    },
    getSchoolDetailsByID:function (req,db,callback) {
        var collection = db.collection('schoolDetails');
        collection.find({_id:req.params.schoolId}).toArray(function (err,result) {
            callback(result);
        })
    }
};
