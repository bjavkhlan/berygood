var mongoose = require('mongoose');

var selectionSchema = new mongoose.Schema({
    student: String,
    lesson: String,
    teacher: String
});


mongoose.model('Selection', selectionSchema);
