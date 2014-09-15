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
      when('/admin/:quizid?', {
        templateUrl: 'views/admin.html',
        controller: 'adminCtrl'
      }).
      otherwise({
        redirectTo: '/error'
      });
  }]);

var itilxControllers = angular.module('itilxControllers', []);


var globalSettings = {
    apiUrl : "https://packagedproperly.azure-mobile.net/",
    apiKey : "ZHcuNczlwvrFBzaocBYfcyzqWMSKYx50"
}

itilxApp.value('globalSettings', globalSettings);