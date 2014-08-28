(function() {

  var quizSvc = function($http) {
    var questionSequence = [],
      initialized = false,
      numberOfQuestions,
      correctAnswers,
      currentQuestionNo,
      quizComplete;

    var initQuiz = function() {
      // Call db to get # of questions
      // Randomly order sequence and put them in an array
      numberOfQuestions = 50;
      correctAnswers = 0;
      currentQuestionNo = 0;
      quizComplete = false;
      initialized = true;
    }
    
    

    var getQuestion = function() {
      if (!initialized)
        initQuiz();

        console.log("retrieving question sequence # " + questionSequence.pop());

        // TBD Retrieve question matching sequence #
        return {
          currentQuestionNo: 1,
          numberOfQuestions: numberOfQuestions,
          correctAnswers: correctAnswers,
          questionid: 1,
          questionText: 'What is the answer?',
          possibleAnswers: [{
            answerid: 1,
            answerText: 'Answer1'
          }, {
            answerid: 2,
            answerText: "Answer2"
          }]
        }
    }

    var submitAnswer = function(questionid, answerid) {
      // tbd call svc to validate answer.
      correctAnswers++;
      return {
        correct: answerid == 2, // tbd retrieve correct answer from svc  
        tipText: "blah blah blah",
        quizComplete: questionSequence.length == 0
      }
    };

    return {
      getQuestion: getQuestion,
      submitAnswer: submitAnswer,
      initQuiz: initQuiz
    }
  }



  // Get reference to previously created module.
  var module = angular.module('itilxApp');
  module.factory('quizSvc', quizSvc);
})();