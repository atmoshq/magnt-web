var magntDirective = angular.module('magntDirective', []);

magntDirective.directive('magntNav', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/views/magnt-nav.html'
  };
});
