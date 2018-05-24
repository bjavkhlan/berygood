var mongoose = require('mongoose');
var Teacher = mongoose.model('Teacher');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.teachersByLesson = function(req, res) {
    if(!req.params.lesson) {
	sendJSONresponse(res, 404, {
	    "message": "Not found, lesson is required"
	});
	return;
    }
    Teacher
	.find({
	    lesson: req.params.lesson
	})
	.exec(function(err, teachers){
	    if(!teachers) {
		sendJSONresponse(res, 404, {
		    "message": "no teachers found"
		})
	    } else {
		sendJSONresponse(res, 200, teachers);
	    }
	});
};

