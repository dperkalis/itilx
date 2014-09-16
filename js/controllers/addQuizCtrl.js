(function () {
    var module = angular.module("itilxControllers");
    module.controller("addQuizCtrl", ["$scope", "$location", "storageSvc", "stateSvc",
        function ($scope, $location, storageSvc, stateSvc) {

            $scope.quiz = { id: "", quizName: "", quizDescription: ""};
            $scope.questions = [];
            $scope.question = { id: "", quizId: "", questionText: "", answer1: "", answer2: "", answer3: "", answer4: ""};


            if (!stateSvc.quizid) {
                $scope.mode = "add";
                $scope.question = { id: "", quizId: "", questionText: "", answer1: "", answer2: "", answer3: "", answer4: ""};
                $scope.showQuestions = false;
                $scope.questionCount = 0;
                $scope.showDelete = false;
            } else {
                $scope.mode = "edit";
                $scope.showQuestions = true;
                $scope.questionCount = 0;
                $scope.showDelete = true;

                bindQuiz(stateSvc.quizid);
            }

            function bindQuestions(quizid) {
                storageSvc.query("questions", "", {quizid: quizid})
                    .then(function (data) {
                        var temp =[];
                        angular.forEach(data, function(item) {
                            temp = temp.concat({
                                id: item.id,
                                question: angular.fromJson(item.question)});
                        });
                        $scope.questions = temp;
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




            $scope.deleteQuiz = function() {
                var quizid = stateSvc.quizid;
                alert("deleting quiz")

                storageSvc.del("questions", {quizid: quizid})
                  .then(function(data) {
                        alert('asdfasdf')

                  });

                storageSvc.del("quizzes", {id:quizid})
                    .then(function(data) {
                        bindQuiz(quizid);

                        $scope.mode = "add";
                        $scope.showQuestions = false;
                        $scope.showDelete = false;
                        $location.path("/admin");
                        $scope.apply();
                    });
            };

            $scope.deleteQuestion = function(questionid) {
                alert(questionid)
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
                        $location.path("/admin/" + data.id);
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
                var question = {
                    questionText: $scope.question.questionText,
                    answers : [
                        {answerid:1, answer1: $scope.question.answer1},
                        {answerid:2, answer1: $scope.question.answer2},
                        {answerid:3, answer1: $scope.question.answer3},
                        {answerid:4, answer1: $scope.question.answer4}]
                };

                storageSvc.insert("questions", {
                    quizId: $scope.quiz.id,
                    question: angular.toJson(question)
                }).then(function (data) {
                    $scope.questions = $scope.questions.concat(data);
                    $scope.questionCount = $scope.questions.length;
                    $scope.$apply();
                });
            }
        }]);


})();
