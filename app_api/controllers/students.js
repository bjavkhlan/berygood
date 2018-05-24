var mongoose = require('mongoose');
var Students = mongoose.model('Student');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* GET list of routes */

module.exports.studentsList = function(req, res) {
    Students
	.find()
	.exec(function(err, students){
	    if(!students) {
		sendJSONresponse(res, 404, {
		    "message": "no students found"
		})
	    } else {
		sendJSONresponse(res, 200, students);
	    }
	});
};

module.exports.studentById = function(req, res) {
    if(!req.params.id) {
	sendJSONresponse(res, 404, {
	    "message": "Not found, all fields are required"
	});
	return;
    }
    console.log(req.params.id);
    Students
	.findOne({
	    id: req.params.id
	})
	.exec(function(err, student){
	    if(!student) {
		sendJSONresponse(res, 404, {
		    "message": "no student found"
		})
	    } else {
		sendJSONresponse(res, 200, student);
	    }
	});
};
