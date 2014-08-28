var itilxApp = angular.module('itilxApp', [
  'ngRoute',
  'itilxControllers'
]);

itilxApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/quiz', {
        templateUrl: 'views/quiz.html',
        controller: 'quizCtrl'
      }).
      otherwise({
        redirectTo: '/error'
      });
  }]);

var itilxControllers = angular.module('itilxControllers', []);