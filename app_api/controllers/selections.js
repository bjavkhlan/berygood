var mongoose = require('mongoose');
var Selection = mongoose.model('Selection');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.selectionsList = function(req, res) {
    if(!req.params.student) {
	sendJSONresponse(res, 404, {
	    "message": "Not found, student is required"
	});
	return;
    }
    Selection
	.find({
	    student: req.params.student
	})
	.exec(function(err, selections){
	    if(!selections) {
		sendJSONresponse(res, 404, {
		    "message": "no lesson found"
		})
	    } else {
		sendJSONresponse(res, 200, selections);
	    }
	});
};

module.exports.selectionsCreate = function(req, res) {
    console.log(req.body);
    Selection
	.create({
	    student: req.body.student,
	    lesson: req.body.lesson,
	    teacher: req.body.teacher
	}, function(err, selection) {
	    if(err) {
		sendJSONresponse(res, 400, err);
	    } else {
		sendJSONresponse(res, 201, selection);
	    }
	});
};


module.exports.selectionDelete = function(req, res) {
    if(!req.params.lesson || !req.params.student) {
	sendJSONresponse(res, 404, {
	    "message": "Not found, all fields are required"
	});
	return;
    }
    console.log(req.params);
    Selection
	.deleteOne({
	    student: req.params.student,
	    lesson: req.params.lesson
	}, function(err) {
	    if(err) {
		sendJSONresponse(res, 400, err);
	    } else {
		sendJSONresponse(res, 200, {});
	    }
	});
};
