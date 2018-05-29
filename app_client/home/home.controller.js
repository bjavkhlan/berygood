(function(){
    "use strict";
    angular
	.module('berygoodApp')
	.controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['dataProvider', 'authentication'];
    function homeCtrl(dataProvider, authentication) {
	// var vm = this;
	// vm.selected = [];
	// vm.lessons = [];
	// vm.id = authentication.currentUser().id;

	// dataProvider.getStudentById(vm.id)
	//     .then(function(response) {
	// 	vm.student = response.data;

	// 	dataProvider.getLessons()
	// 	    .then(function(response) {
	// 		for (var i = 0; i < response.data.length; i++)
	// 		    if (vm.student.lessons.includes(response.data[i].index))
	// 			vm.lessons.push(response.data[i]);
	// 	    })
	// 	    .catch(function(err) {
	// 		console.log(err);
	// 	    });
		
	//     })
	//     .catch(function(err) {
	// 	console.log(err);
	//     });
	
    }
})();

