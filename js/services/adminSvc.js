(function() {

    var module = angular.module("itilxApp");
    module.factory("adminSvc", ["storageSvc", function (storageSvc) {


        var addQuestion = function(question) {
            storageSvc.insert("quizzes", question);
        };

        var getQuestions = function(quizId) {
            return storageSvc.query("quizzes", "id", {quizId: quizId});

            var quizTable = storageSvc.getEntity("quizzes");

            var query = quizTable.select("id").where({
                quizId: quizId
            }).read().done(function(results) {
                return results;
            }, function(err) {
                return err;
            });
        };

        return {
            addQuestion: addQuestion,
            getQuestions: getQuestions
        }
    }]);
})();
