var mongoose = require('mongoose');
var Lessons = mongoose.model('Lesson');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* GET list of routes */

module.exports.lessonsList = function(req, res) {
    Lessons
	.find()
	.exec(function(err, lessons){
	    if(!lessons) {
		sendJSONresponse(res, 404, {
		    "message": "no lesson found"
		})
	    } else {
		sendJSONresponse(res, 200, lessons);
	    }
	});
};

module.exports.lessonsCreate = function(req, res) {
    console.log(req.body);
    Lessons
	.create({
	    name: req.body.name,
	    index: req.body.index,
	    creadit: req.body.credit,
	    description: req.body.description,
	    season: req.body.season
    }, function(err, lesson) {
	if(err) {
	    sendJSONresponse(res, 400, err);
	} else {
	    sendJSONresponse(res, 201, lesson);
	}
    });
};

