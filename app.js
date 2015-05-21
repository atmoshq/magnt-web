var magntWebApp = angular.module('magntWebApp', [
  'ngRoute',
  'ngCookies',
  'magntControllers'
]);

magntWebApp.config(['$routeProvider',
  function($routeProvider) {
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
      when('/magnets/:magnetId/qa', {
        templateUrl: 'partials/question-list.html',
        controller: 'QuestionListCtrl'
      }).
      when('/magnets/qa/:magnetId/:questionId/view', {
        templateUrl: 'partials/answer-list.html',
        controller: 'ListAnswers'
      }).
      when('/magnets/:magnetId/qa/ask', {
        templateUrl: 'partials/ask-question.html',
        controller: 'AskQuestion'
      }).
      when('/magnets/:magnetId/qa/:questionId/answer', {
        templateUrl: 'partials/answer-question.html',
        controller: 'AnswerQuestion'
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
