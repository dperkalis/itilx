(function () {
    var module = angular.module("itilxApp");

    module.factory("quizSvc", ["storageSvc", function (storageSvc) {
        var questionSequence = [],
            initialized = false,
            numberOfQuestions,
            correctAnswers,
            currentQuestionNo,
            quizComplete;


        function shuffle(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }


        var initQuiz = function (quizId) {
            return storageSvc.query("quizzes", "id", {quizId: quizId}).then(function (data) {
                questionSequence = shuffle(data);
                numberOfQuestions = questionSequence.length;
                correctAnswers = 0;
                currentQuestionNo = 0;
                quizComplete = false;
                initialized = true;

            });
        }

        var getQuestion = function () {
            var question = questionSequence.pop();

            return storageSvc.query("quizzes", "id, question, answer1, answer2, answer3, answer4",
                {id: question.id})
                .then(function (data) {
                    currentQuestionNo++;
                    return {
                        currentQuestionNo: currentQuestionNo,
                        numberOfQuestions: numberOfQuestions,
                        questionId: data[0].id,
                        questionText: data[0].question,
                        possibleAnswers: [
                            {
                                answerId: 1,
                                answerText: data[0].answer1
                            },
                            {
                                answerId: 2,
                                answerText: data[0].answer2
                            }
                        ]
                    }
                });

        }

        var submitAnswer = function (questionid, answerid) {
            // tbd call svc to validate answer.
            correctAnswers++;
            return {
                correct: answerid == 2, // tbd retrieve correct answer from svc
                tipText: "blah blah blah",
                quizComplete: questionSequence.length == 0,
                correctAnswers: correctAnswers
            }
        };


        return {
            initQuiz: initQuiz,
            getQuestion: getQuestion,
            submitAnswer: submitAnswer
        }
    }]);
})();




