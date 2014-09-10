(function() {

    var module = angular.module("itilxApp");
    module.factory("adminSvc", ["storageSvc", function (storageSvc) {


        var addQuestion = function(question) {
            storageSvc.insert("quizzes", question);
        };

        var getQuestions = function(quizId) {
            return storageSvc.query("quizzes", "id", {quizId: quizId});
        };

        return {
            addQuestion: addQuestion,
            getQuestions: getQuestions
        }
    }]);
})();
