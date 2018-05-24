(function(){
    "use strict";
    angular
	.module('berygoodApp')
	.service('dataProvider', dataProvider);

 //   dataProvider.$inject = ['$http', '__env'];
    dataProvider.$inject = ['$http'];
    function dataProvider($http) {
	var service = this;
	service.getLessons = function() {
//	    return $http.get(__env.lessonsApiUrl);
	    return $http.get('/api/lessons');
	};

	service.getStudentById = function(id) {
	    return $http.get('/api/students/'+id);
	};

	service.getCurByIndex = function(curriculum) {
	    return $http.get('/api/curriculums/'+curriculum);
	};
	
	service.postSelection = function(selection) {
	    return $http.post('/api/selection', selection);
	};

	service.deleteSelection = function(selection) {
	    return $http.delete('/api/selection/'+selection.student+'/'+selection.lesson);
	};
	
	service.getSelection = function(student) {
	    return $http.get('/api/selection/'+student);
	};

	service.getTeachers = function(lesson) {
	    return $http.get('/api/teachers/'+lesson);
	};

    }
})();
