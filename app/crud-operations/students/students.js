module.exports = {
	saveStudentDetails:function(req,db,callback){
        var studentId = (req.body.studentName).replace(/\s/g, '')+(Math.floor(Math.random() * 1000))+'@'+(req.body.schoolName).replace(/\s/g, '')+'.com';
        var collection = db.collection('student');
            collection.insert({
                _id:studentId,
                studentName:req.body.studentName,
                studentDOB:req.body.studentDOB,
                studentGender:req.body.studentGender,
                fName:req.body.fName,
                mName:req.body.mName,
                studentClass:req.body.studentClass,
                countryName:req.body.countryName,
                stateNmae:req.body.stateNmae,
                districtName:req.body.districtName,
                cityName:req.body.cityName,
                address:req.body.address,
                mobileNo:req.body.mobileNo,
                schoolName:req.body.schoolName
        },
            function (err,result) {
                callback(err,result)
            }
        );
	},
    getStudentsDetails:function(req,db,callback){
         var collection=db.collection('student');
        collection.find({}).toArray(function (err,schoolDetails) {
            callback(schoolDetails);
        })
    }
}