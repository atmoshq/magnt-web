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
      when('/magnets/qa/:magnetId/ask', {
        templateUrl: 'partials/ask-question.html',
        controller: 'AskQuestion'
      }).
      when('/magnets/qa/:magnetId/:questionId/answer', {
        templateUrl: 'partials/answer-question.html',
        controller: 'AnswerQuestion'
      });
}]);
magntWebApp.factory('userData', function() {
  var token = '';
  var userId = '';
  return {
    getToken: function() {
      return token;
    },
    setToken: function(tokenId) {
      token = tokenId;
    },
    setUserId: function(userIDin) {
      userId = userIDin;
    },
    getUserId: function() {
      return userId;
    }
  }
});
magntWebApp.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});
