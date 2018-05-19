var mongoose = require('mongoose');

var lessonSchema = new mongoose.Schema({
    name: String,
    index: String,
    credit: Number,
    description: String,
    season: String
});


mongoose.model('Lesson', lessonSchema);

/*

db.lessons.insert({
    name: 'Програм хангамжийн төсөл',
    index: 'SE0123',
    credit: 3,
    description: 'бла бла бла',
    season: 'spring'
})

db.lessons.insert({
    name: 'Математик 1б',
    index: 'MAT101',
    credit: 3,
    description: 'бла бла бла',
    season: 'both'
})



*/
