(function() {

    "use strict";
    angular.module('berygoodApp', ['ngRoute']);

    config.$inject = ['$routeProvider'];
    function config ($routeProvider) {
	$routeProvider
	    .when('/', {
		templateUrl: 'home/home.view.html',
		controller: 'homeCtrl',
        	controllerAs: 'vm'
	    })
	    .when('/about', {
		templateUrl: 'about/about.view.html',
		controller: 'aboutCtrl',
        	controllerAs: 'vm'
	    })
	    .when('/why', {
		templateUrl: 'common/views/genericText.view.html',
		controller: 'whyCtrl',
		controllerAs: 'vm'
	    })
	    .when('/selection', {
		templateUrl: 'selection/selection.view.html',
		controller: 'selectionCtrl',
		controllerAs: 'vm'
	    })
	    .when('/register', {
		templateUrl: '/auth/register/register.view.html',
		controller: 'registerCtrl',
		controllerAs: 'vm'
	    })
	    .when('/login', {
		templateUrl: '/auth/login/login.view.html',
		controller: 'loginCtrl',
		controllerAs: 'vm'
	    })
	    .otherwise({redirectTo: '/'});
    }

    var env = {};

    if(window){  
	Object.assign(env, window.__env);
    }

    angular
	.module('berygoodApp')
	.config(['$routeProvider', config])
	.constant('__env', env);
    
})();


