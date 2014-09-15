(function () {
    var module = angular.module("itilxControllers");
    module.controller("addQuizCtrl", ["$scope", "storageSvc", "stateSvc",
        function ($scope, storageSvc, stateSvc) {

            function bindQuestions(quizid) {
                storageSvc.query("questions", "", {quizid: quizid})
                    .then(function (data) {
                        $scope.questions = data;
                        $scope.$apply();
                    });
            };

            function bindQuiz(quizid) {
                storageSvc.query("quizzes", "", {id: quizid})
                    .then(function (data) {
                        if (data && data.length == 1) {
                            $scope.quiz = data[0];
                            bindQuestions(quizid);
                        }
                        else {
                            stateSvc.quizid = "";
                            $scope.quiz = {};
                            $scope.mode = "add";
                            $scope.$apply();
                        }
                    });
            }


            $scope.quiz = { id: "", quizName: "", quizDescription: ""};
            $scope.questions = [];
            $scope.question = { id: "", quizId: "", questionText: "", answer1: "", answer2: "", answer3: "", answer4: ""};


            if (!stateSvc.quizid) {
                $scope.mode = "add";
                $scope.question = { id: "", quizId: "", questionText: "", answer1: "", answer2: "", answer3: "", answer4: ""};
                $scope.showQuestions = false;
                $scope.questionCount = 0;
            } else {
                $scope.mode = "edit";
                $scope.showQuestions = true;
                $scope.questionCount = 0;

                bindQuiz(stateSvc.quizid);
            }

            $scope.deleteQuiz = function() {

                var quizid = stateSvc.quizid;

                storageSvc.del("questions", {quizid: quizid})
                  .then(function(data) {
                      alert("questions deleted");
                      bindQuestions(quizid);
                  });

                storageSvc.del("quizzes", {id:quizid})
                    .then(function(data) {
                        alert("quiz deleted!");
                        bindQuiz(quizid);
                    });
            };

            $scope.deleteQuestion = function(questionid) {
              storageSvc.del("questions", {id:questionid})
                  .then(function(data) {
                      bindQuestions(stateSvc.quizid);
                  });
            };

            $scope.addQuiz = function () {
                if ($scope.mode === "add") {
                    storageSvc.insert("quizzes", {
                        quizName: $scope.quiz.quizName,
                        quizDescription: $scope.quiz.quizDescription
                    }).then(function (data) {
                        $scope.quiz.id = data.id;
                        $scope.showQuestions = true;
                        $scope.mode = "edit";
                        stateSvc.quizid = data.id;
                        $scope.$apply();
                    });
                } else {
                    storageSvc.update("quizzes", {
                        id: $scope.quiz.id,
                        quizName: $scope.quiz.quizName,
                        quizDescription: $scope.quiz.quizDescription
                    }).then(function (data) {
                        console.log(data);
                    })
                }
            };

            $scope.addQuestion = function () {
                storageSvc.insert("questions", {
                    quizId: $scope.quiz.id,
                    questionText: $scope.question.questionText,
                    answer1: $scope.question.answer1,
                    answer2: $scope.question.answer2,
                    answer3: $scope.question.answer3,
                    answer4: $scope.question.answer4
                }).then(function (data) {
                    $scope.questions = $scope.questions.concat(data);
                    $scope.questionCount = $scope.questions.length;
                    $scope.$apply();
                });
            }
        }]);


})();
