var magntWebApp = angular.module('magntWebApp', [
  'ngRoute',
  'ngCookies',
  'magntControllers'
]);

magntWebApp.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/signup', {
        templateUrl: 'partials/signup-view.html',
        controller: 'SignupView'
      }).
      when('/', {
        templateUrl: 'partials/welcome-view.html',
        controller: 'WelcomeView'
      }).
      when('/magnets', {
        templateUrl: 'partials/magnet-list.html',
        controller: 'MagnetListCtrl'
      }).
      when('/magnets/:magnetId', {
        templateUrl: 'partials/magnet-view.html',
        controller: 'MagnetViewCtrl'
      }).
      when('/magnets/:magnetId/qa/:questionId/answer', {
        templateUrl: 'partials/answer-question.html',
        controller: 'ListAnswers'
      });
}]);
magntWebApp.factory('userData', ['$cookieStore', function($cookieStore) {
  var token = '';
  var userId = '';
  return {
    getToken: function() {
      return token;
    },
    setToken: function(tokenId) {
      token = tokenId;
      $cookieStore.put("userToken", tokenId);
    },
    setUserId: function(userIDin) {
      userId = userIDin;
      $cookieStore.put("userId", userId);
    },
    getUserId: function() {
      if(!userId){
        userId = $cookieStore.get(userId);
      }
      return userId;
    }
  }

}]);
magntWebApp.factory('apiQuestions', ['$cookieStore', function($cookieStore) {
  var questionlist = [];
  return {
    getQuestions: function(magnetid) {
      $http.get('http://api.magnt.co/api/magnets/' + $routeParams.magnetId + '/questions?filter[include]=people&filter[include]=answers').
        success(function (data, status, headers, config){
          questionlist = data;
          return questionlist;
        }).
        error(function (data, status, headers, config){
          return 0;
        });
    }
  }
}]);
