(function(){
    "use strict";
    angular
	.module('berygoodApp')
	.controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', 'transdepData', '$sce', '$window', '$timeout'];
    function homeCtrl($scope, transdepData, $sce, $window, $timeout) {
	var vm = this;
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var mapPinIcon = '/images/pin.png';
	
	transdepData.getRoutes()
	    .then(function(response) {
		vm.routes = response.data;
		vm.parseData();
	    })
	    .catch(function(err) {
		console.log(err);
	    });

	vm.parseData = function() {
	    vm.departures = [];
	    for (var i = 0; i < vm.routes.length; i++)
		for (var j = 0; j < vm.routes[i].departures.length; j++) {
		    vm.departures.push({
			origin: vm.routes[i].origin.name,
			destination: vm.routes[i].destination.name,
			date: vm.routes[i].departures[j].date,
			bus: vm.routes[i].departures[j].bus,
			routeIdx: i			
		    });
		}
	    vm.search(0);
	};
	
	vm.search = function(index) {

	    vm.route = vm.routes[vm.departures[index].routeIdx];
	    vm.route.date = vm.departures[index].date;
	    vm.route.bus = vm.departures[index].bus;
	    // $scope.searchMessage = 'Чиглэл: ' + vm.route.origin.name + '-' + vm.route.destination.name
	    transdepData.getBusLocation(vm.departures[index].bus.licenseNumber)
		.then(function(response) {
		    vm.busLoc = response.data;
		    vm.getRemainingTime();
		    vm.calculateAndDisplayRoute();
		})
		.catch(function(response) {
		    vm.searchMessage = 'Хайлт олдсонгүй';
		    console.log(err);
		});
	    
	};

 	vm.getRemainingTime = function() {

	    // Remaining
	    vm.remaining = {};
	    var routeData = {
	    	origin: vm.busLoc.lat + ', ' + vm.busLoc.lng,
	    	destination: vm.route.destination.lat + ', ' + vm.route.destination.lng,
	    	travelMode: 'DRIVING'
	    };
	    
	    directionsService.route(routeData, function(response, status) {
	    	if (status === 'OK') {
		    vm.remaining.duration = response.routes[0].legs[0].duration.value;
		    vm.remaining.distance = response.routes[0].legs[0].distance.value;
		    // $scope.searchMessage += '\n' + vm.route.destination.name + ' хүртэл ' + response.routes[0].legs[0].distance.text + ' зам үлдсэн ба ойролцоогоор ' + response.routes[0].legs[0].duration.text + ' дараа очно.';
	    	} else {
	    	    window.alert('Directions request failed due to ' + status);
	    	}
	    });


	    // Elapsed
	    
	    vm.elapsed = {};
	    var routeData = {
		origin: vm.route.origin.lat + ', ' + vm.route.origin.lng,
	    	destination: vm.busLoc.lat + ', ' + vm.busLoc.lng,
	    	travelMode: 'DRIVING'
	    };
	    
	    directionsService.route(routeData, function(response, status) {
	    	if (status === 'OK') {
		    //vm.elapsed.duration = response.routes[0].legs[0].duration.value;
		    vm.elapsed.duration = (Date.parse(new Date()) - Date.parse(vm.route.date))/1000;
		    vm.elapsed.distance = response.routes[0].legs[0].distance.value;
		    // $scope.searchMessage += '\n' + vm.route.origin.name+'-с хөдлөөд ' +  response.routes[0].legs[0].distance.text + ' замыг ' + response.routes[0].legs[0].duration.text + ' хугацаанд туулсан.';
		    // console.log($scope.searchMessage);
	    	} else {
	    	    window.alert('Directions request failed due to ' + status);
	    	}
	    });

	    $timeout(function() {
	    }, 300);
	};


	vm.calculateAndDisplayRoute = function() {
	    // var image = {
	    // 	url: mapPinIcon,
	    // 	size: new google.maps.Size(100, 100),
	    // 	origin: new google.maps.Point(0, 0),
	    // 	anchor: new google.maps.Point(17, 34),
	    // 	scaledSize: new google.maps.Size(25, 25)
	    // };
	    vm.busMarker = new google.maps.Marker({
		position: vm.busLoc,
		map: vm.map,
		title: 'Автобус',
		animation: google.maps.Animation.DROP,
		label: 'Bus',
		// symbol: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
		// icon: image
            });
	    
	    var routeData = {
		origin: vm.route.origin.lat + ', ' + vm.route.origin.lng,
		destination: vm.route.destination.lat + ', ' + vm.route.destination.lng,
		travelMode: 'DRIVING',
		waypoints: []
	    }

	    vm.route.waypoints.forEach(function(point) {
		routeData.waypoints.push({
		    location: point.lat + ', ' + point.lng,
		    stopover: true
		});
	    });

	    directionsService.route(routeData, function(response, status) {
		if (status === 'OK') {
		    directionsDisplay.setDirections(response);
		} else {
		    window.alert('Directions request failed due to ' + status);
		}
	    });

	}

	$window.initMap = function() {
	    vm.map = new google.maps.Map(document.getElementById('map'), {});
	    directionsDisplay.setMap(vm.map);
	};
	$window.initMap();
    }
})();

