var magntDirective = angular.module('magntDirective', []);

magntDirective.directive('magntNav', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/views/magnt-nav.html'
  };
});
magntDirective.directive('magntSide', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/views/magnt-side.html'
  };
});
magntDirective.directive('magntHead', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/views/magnt-head.html'
  };
});
magntDirective.directive('magntQuestions', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/views/magnt-questions.html'
  };
});
magntDirective.directive('magntAnswers', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/views/magnt-answers.html'
  };
});
