var mongoose = require('mongoose');
var Curriculums = mongoose.model('Curriculum');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* GET list of routes */

module.exports.curriculumsList = function(req, res) {
    Curriculums
	.find()
	.exec(function(err, currs){
	    if(!currs) {
		sendJSONresponse(res, 404, {
		    "message": "no lesson found"
		})
	    } else {
		sendJSONresponse(res, 200, currs);
	    }
	});
};


module.exports.curriculumByIndex = function(req, res) {
    if(!req.params.index) {
	sendJSONresponse(res, 404, {
	    "message": "Not found, all fields are required"
	});
	return;
    }
    
    Curriculums
	.findOne({
	    index: req.params.index
	})
	.exec(function(err, currs){
	    if(!currs) {
		sendJSONresponse(res, 404, {
		    "message": "no lesson found"
		})
	    } else {
		sendJSONresponse(res, 200, currs);
	    }
	});
};
