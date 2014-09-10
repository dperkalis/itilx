// Code goes here

(function() {

  var itilxControllers = angular.module("itilxControllers");

  itilxControllers.controller('quizCtrl', ['$scope', '$routeParams', 'quizSvc',
    function($scope, $routeParams, quizSvc) {

      var quizId = $routeParams.quizId;

      var reset = function(data) {
        $scope.question = data;
        $scope.quizComplete = false;
        $scope.showNext = false;
        $scope.showFinish = false;
        $scope.showSubmit = true;
        $scope.formdata = {};
        $scope.currentQuestionNo = 0;
        $scope.answerResponse = "";
        $scope.$apply();
      }

      quizSvc.initQuiz(quizId).then(function(data) {
          quizSvc.getQuestion().then(function(data) {
              $scope.showNext = false;
              $scope.showFinish = false;
              $scope.formdata = {};
              $scope.answerResponse = {};
              $scope.question = data;
              $scope.$apply();
          });
      });




      $scope.getQuestion = function() {
        quizSvc.getQuestion().then(function(data) {
          $scope.showNext = false;
          $scope.showFinish = false;
          $scope.formdata = {};
          $scope.answerResponse = {};
          $scope.question = data;
          $scope.$apply();
        });
      };


      $scope.submitAnswer = function(answerid) {
        $scope.answerResponse = quizSvc.submitAnswer($scope.question.questionid,
          $scope.formdata.chosenAnswer);

        $scope.showFinish = $scope.answerResponse.quizComplete;
        $scope.showNext = !$scope.answerResponse.quizComplete;
      };


      $scope.showResults = function() {
        $scope.quizComplete = true;
      };

      $scope.restartQuiz = function() {
        quizSvc.initQuiz(quizId);
          quizSvc.getQuestion();

      };
    }
  ]);

})();