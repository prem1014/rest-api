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
                schoolName:req.body.schoolName,
                personalInfo: {
                	country: {
                		name: req.body.personalInfo.country.name,
                		selectedCountryId: req.body.personalInfo.country.selectedCountryId
                	},
                	state: {
                		name: req.body.personalInfo.state.name,
                		selectedStateId: req.body.personalInfo.state.selectedStateId
                	},
                	district: {
                		name: req.body.personalInfo.district.name,
                		selectedDistrictId: req.body.personalInfo.district.selectedDistrictId
                	},
                	cityName: req.body.personalInfo.cityName,
                	address: req.body.personalInfo.address,
                	mobileNo: req.body.personalInfo.mobileNo,
                	emailId: req.body.personalInfo.emailId,
                	pinCode: req.body.personalInfo.pinCode
                }
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
    },
    getStudentsDetailsById:function(req,db,callback){
         var collection=db.collection('student');
        collection.find({_id:req.params.studentId}).toArray(function (err,schoolDetails) {
            callback(schoolDetails);
        })
    }
}