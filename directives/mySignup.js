var app = angular.module("app", []);

app.directive('mySignup', function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/mySignup.html'
	};
});