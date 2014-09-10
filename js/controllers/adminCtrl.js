(function() {

	var itilxControllers = angular.module("itilxControllers");

	itilxControllers.controller('adminCtrl', ['$scope', '$routeParams', 'adminSvc',
		function($scope, $routeParams, adminSvc) {
			var quizId = $routeParams.quizId;

			$scope.question = "";
			$scope.answer1 = "";
			$scope.answer2 = "";
			$scope.answer3 = "";
			$scope.answer4 = "";

			$scope.addQuestion = function() {
				console.log($scope.question)
				adminSvc.addQuestion({
					quizId: quizId,
					question: $scope.question,
					answer1: $scope.answer1,
					answer2: $scope.answer2,
					answer3: $scope.answer3,
					answer4: $scope.answer4
				});
			};

			$scope.questions = adminSvc.getQuestions(quizId);
		}
	]);
})();