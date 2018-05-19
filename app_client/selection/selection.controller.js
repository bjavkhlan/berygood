(function() {
    "use strict";
    angular
	.module('berygoodApp')
	.controller('selectionCtrl', selectionCtrl);

    selectionCtrl.$inject = ['$scope', 'dataProvider'];
    function selectionCtrl($scope, dataProvider) {
	var vm = this;

	dataProvider.getLessons()
	    .then(function(response) {
		vm.lessons = response.data;
		console.log(vm.lessons);
	    })
	    .catch(function(err) {
		console.log(err);
	    });
	// dataProvider.getCurriculums()
	//     .then(function(response) {
	// 	vm.curriculums = response.data;
	//     })
	//     .catch(function(err) {
	// 	console.log(err);
	//     });
    }
})();
