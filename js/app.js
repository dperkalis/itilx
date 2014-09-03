var itilxApp = angular.module('itilxApp', [
  'ngRoute',
  'itilxControllers'
]);

itilxApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/quiz/:quizId', {
        templateUrl: 'views/quiz.html',
        controller: 'quizCtrl'
      }).
      when('/admin/:quizId', {
        templateUrl: 'views/admin.html',
        controller: 'adminCtrl'
      }).
      otherwise({
        redirectTo: '/error'
      });
  }]);

var itilxControllers = angular.module('itilxControllers', []);