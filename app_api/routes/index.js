var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

var ctrlLessons = require('../controllers/lessons');
var ctrlStudents = require('../controllers/students');
var ctrlCurriculums = require('../controllers/curriculums');
var ctrlSelection = require('../controllers/selections');

var ctrlAuth = require('../controllers/authentication');

router.get('/students', ctrlStudents.studentsList);

router.get('/lessons', ctrlLessons.lespsonsList);
router.post('/lessons', ctrlLessons.lessonsCreate);

router.get('/curriculums', ctrlCurriculums.curriculumsList);

router.get('/selection/:student', ctrlSelection.selectionsList);
router.post('/selection', ctrlSelection.selectionsCreate);
// router.delete('/selection/:id', ctrlSelection.selectionDelete);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
