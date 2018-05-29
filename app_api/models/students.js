var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    name: { type: String,  required: true },
    curriculum: { type: String, required: true },
    id: {
	type: String,
	required: true,
	unique: true
    },
    lessons: [String]
});



mongoose.model('Student', studentSchema);

