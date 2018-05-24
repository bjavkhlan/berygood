(function(){
    "use strict";
    angular
	.module('berygoodApp')
	.service('authentication', authentication);

    authentication.$inject = ['$window', '$http'];
    function authentication($window, $http) {
	var service = this;
	service.getToken = function() {
	    return $window.localStorage['berygood-token'];
	};
	service.saveToken = function(token) {
	    $window.localStorage['berygood-token'] = token;
	};
	service.register = function(user) {
	    return $http.post('/api/register', user).success(function(data){
		service.saveToken(data.token);
	    });
	};
	service.login = function(user) {
	    return $http.post('/api/login', user).success(function(data) {
		service.saveToken(data.token);
	    });
	};
	service.logout = function() {
	    $window.localStorage.removeItem('berygood-token');
	};
	service.isLoggedIn = function() {
	    var token = service.getToken();
	    if(token){
		var payload = JSON.parse($window.atob(token.split('.')[1]));
		return payload.exp > Date.now() / 1000;
	    } else {
		return false;
	    }
	};
	service.currentUser = function() {
	    if(service.isLoggedIn()){
		var token = service.getToken();
		var payload = JSON.parse($window.atob(token.split('.')[1]));
		return {
		    id: payload.id
		};
	    }
	};
    }
})();
