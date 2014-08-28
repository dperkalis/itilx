// Code goes here

(function() {
  
var itilxControllers = angular.module("itilxControllers");

itilxControllers.controller('quizCtrl', ['$scope', '$routeParams', 'quizSvc',
  function($scope, $routeParams, quizSvc) {
   
    $scope.quizComplete = false;
    $scope.showNext = false;
    $scope.showFinish = false;
    $scope.formdata = {};
    $scope.question = quizSvc.getQuestion();

    $scope.submitAnswer = function(answerid) {
      $scope.answerResponse = quizSvc.submitAnswer($scope.question.questionid,
        $scope.formdata.chosenAnswer);
        
      $scope.showFinish = $scope.answerResponse.quizComplete;
      $scope.showNext = !$scope.answerResponse.quizComplete;
    };

    $scope.nextQuestion = function() {
      $scope.showNext = false;
      $scope.showFinish = false;
      $scope.formdata = {};
      $scope.answerResponse = {};
      $scope.question = quizSvc.getQuestion();
    };
    
    $scope.showResults = function() {
      $scope.quizComplete = true;
    };
    
    $scope.restartQuiz = function() {
      quizSvc.initQuiz();
      $scope.quizComplete = false;
      $scope.nextQuestion();
    };
  }]);

})();