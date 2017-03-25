module.exports = {
	saveTeacherDetails:function(req,db,callback){
		var teacherId = (req.body.teacherName).replace(/\s/g, '')+(Math.floor(Math.random() * 1000))+'@'+(req.body.schoolName).replace(/\s/g, '')+'.com';
        var collection = db.collection('teacher');
            collection.insert({
                _id:teacherId,
                teacherName:req.body.teacherName,
                teacherDOB:req.body.teacherDOB,
                teacherGender:req.body.teacherGender,
                teacherQualification:req.body.teacherQualification,
                teacherExperience:req.body.teacherExperience,
                countryName:req.body.personalInfo.country.name,
                stateNmae:req.body.personalInfo.state.name,
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
    getTeachersDetails:function(req,db,callback){
         var collection=db.collection('teacher');
        collection.find({}).toArray(function (err,schoolDetails) {
            callback(schoolDetails);
        })
    }	
}