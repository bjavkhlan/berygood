(function() {
    "use strict";
    angular
	.module('berygoodApp')
	.controller('selectionCtrl', selectionCtrl);

    selectionCtrl.$inject = ['$scope', '$route', 'dataProvider', 'authentication'];
    function selectionCtrl($scope, $route, dataProvider, authentication) {
	var vm = this;
	// vm.selected = new Object();
	vm.selected = [];
	vm.lessons = [];
	vm.id = authentication.currentUser().id;

	dataProvider.getStudentById(vm.id)
	    .then(function(response) {
		vm.student = response.data;
		console.log("student", vm.student);


		dataProvider.getCurByIndex(vm.student.curriculum)
		    .then(function(response) {
			vm.curriculum = response.data;
			console.log("curriculum", vm.curriculum);


			dataProvider.getLessons()
			    .then(function(response) {
				// vm.lessons = response.data;
				for (var i = 0; i < response.data.length; i++)
				    if (vm.curriculum.lessons.includes(response.data[i].index))
					vm.lessons.push(response.data[i]);
				// console.log(vm.lessons);

			    })
			    .catch(function(err) {
				console.log(err);
			    });
		    })
		    .catch(function(err) {
			console.log(err);
		    });

	    })
	    .catch(function(err) {
		console.log(err);
	    });
	
	
	

	
	
	dataProvider.getSelection(vm.id)
	    .then(function(response) {
		for (var i = 0; i < response.data.length; i++)
		    // vm.selected.push(response.data[i].lesson);
		    vm.selected.push(response.data[i]);
		

		// vm.selected[response.data[i].lesson] = response.data[i];
		console.log("selection", vm.selected);
	    })
	    .catch(function(err) {
		console.log(err);
	    });
	

	vm.isSelected = function(lessonf) {
	    for (var i = 0; i < vm.selected.length; i++)
		if (vm.selected[i].lesson === lessonf)
		    return vm.selected[i];

	    return false;
	    // return vm.selected.find(
	    // 	function(selection) {
	    // 	    return selection === lessonf;
	    // 	});
	};

	vm.selectLesson = function(lesson) {
	    
	    dataProvider.getTeachers(lesson)
		.then(function(response) {
		    vm.teachers = response.data;
		    vm.selectedLesson = lesson;
		    console.log('teacher', response.data);
		})
		.catch(function(err) {
		    console.log(err);
		});
	    
	};

	vm.selectTeacher = function(teacher) {
	    vm.teachers = undefined;
	    dataProvider.postSelection({
		student: vm.id,
		lesson: vm.selectedLesson,
		teacher: teacher
	    })
		.then(function(response) {
		    console.log(response);
		    $route.reload();
		})
		.catch(function(err) {
		    console.log(err);
		});

	}

	vm.deleteSelection = function(lesson) {
	    dataProvider.deleteSelection({
		student: vm.id,
		lesson: lesson
	    })
		.then(function(response) {
		    console.log(response);
		    $route.reload();
		})
		.catch(function(err) {
		    console.log(err);
		});
	};

    }
})();
