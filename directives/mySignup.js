var mySignup = angular.module('mySignup', []);

mySignup.directive('mySignup', function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/mySignup.html'
	};
});