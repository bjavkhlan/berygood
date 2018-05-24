var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
    teacher: String,
    lesson: String
});

mongoose.model('Teacher', teacherSchema);
