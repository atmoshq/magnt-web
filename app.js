var magntWebApp = angular.module('magntWebApp', [
  'ngRoute',
  'ngCookies',
  'magntControllers',
  'pwdCheck'
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
magntWebApp.factory('apiQuestions', ['$http', function($http) {
  var questionlist = [];
  return {
    getQuestions: function(magnetid) {
      return $http.get('http://api.magnt.co/api/magnets/' + magnetid + '/questions?filter[include]=people');
    },
    singleQuestion: function(questionid) {
      return $http.get('http://api.magnt.co/api/questions/' + questionid + '?filter[include]=magnet&filter[include]=people');
    }
  }
}]);
magntWebApp.factory('apiAnswers', ['$http', function($http) {
  var answerlist = [];
  return {
    getAnswers: function(questionid) {
      return $http.get('http://api.magnt.co/api/answers/?filter[where][questionid]=' + questionid + '&filter[include]=person');
    }
  }
}]);
