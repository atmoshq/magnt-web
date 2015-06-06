var magntDirective = angular.module('magntDirective', []);

magntDirective.directive('magntSide', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/views/magnt-side.html'
  };
});
