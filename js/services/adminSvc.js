(function() {
  var adminSvc = function() {

    var getClient = function() {
      return new WindowsAzure.MobileServiceClient(
        "https://packagedproperly.azure-mobile.net/",
        "ZHcuNczlwvrFBzaocBYfcyzqWMSKYx50"
      );
    };

    var addQuestion = function(question) {
      var client = getClient();
      client.getTable("quizzes").insert(question);
    };

    var getQuestions = function(quizId) {
      var client = getClient();

      quizTable = client.getTable("quizzes");
     
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
  };

  var module = angular.module("itilxApp");
  module.factory("adminSvc", adminSvc);

})();