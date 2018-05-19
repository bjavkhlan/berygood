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
	    return $http.get('http://localhost:3000/api/lessons');
	};

    }
})();
