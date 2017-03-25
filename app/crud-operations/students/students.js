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
                countryName:req.body.personalInfo.country.name,
                stateName:req.body.personalInfo.state.name,
                districtName:req.body.personalInfo.district.name,
                cityName:req.body.personalInfo.cityName,
                address:req.body.personalInfo.address,
                mobileNo:req.body.personalInfo.mobileNo,
                schoolName:req.body.schoolName,
                emailId:req.body.personalInfo.emailId,
                pinCode:req.body.personalInfo.pinCode,
                countryId:req.body.personalInfo.country.selectedCountryId,
                stateId:req.body.personalInfo.state.selectedStateId,
                districtId:req.body.personalInfo.district.selectedDistrictId
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