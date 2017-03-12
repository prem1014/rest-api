module.exports = {
	saveTeacherDetails:function(req,db,callback){
		var teacherId = (req.body.teacherName).replace(/\s/g, '')+(Math.floor(Math.random() * 1000))+'@'+(req.body.schoolName).replace(/\s/g, '')+'.com';
        var collection = db.collection('teacher');
            collection.insert({
                _id:teacherId,
                teacherName:req.body.teacherName,
                teacherDOB:req.body.teacherDOB,
                teacherGender:req.body.teacherGender,
                countryName:req.body.countryName,
                stateNmae:req.body.stateNmae,
                districtName:req.body.districtName,
                cityName:req.body.cityName,
                address:req.body.address,
                schoolName:req.body.schoolName,
                mobileNo:req.body.mobileNo
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