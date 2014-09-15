(function() {

	var itilxControllers = angular.module("itilxControllers");

	itilxControllers.controller('adminCtrl', ['$scope','$routeParams', 'stateSvc',
		function($scope, $routeParams, stateSvc) {
            stateSvc.quizid = $routeParams.quizid;
		}
	]);
})();