(function() {
  var adminService = function() {
    var addQuiz = function() {
      alert('hi');
    }
    
    return {
      addQuiz: adQuiz
    }
  };
  
  var module = angular.module("itilx");
  module.factory("adminService", adminService);
  
})();