var mongoose = require('mongoose');

var curriculumSchema = new mongoose.Schema({
    name: String,
    index: String,
    description: String,
    lessons: [String] 
});


mongoose.model('Curriculum', curriculumSchema);


/*
  
db.curriculums.insert({
name: 'Компьютерийн Ухаан',
index: 'CS14',
description: 'CS -> GO',
lessons: ['SE0123', 'MAT101']
})


*/
