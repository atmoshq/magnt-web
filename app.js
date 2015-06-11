var magntWebApp = angular.module('magntWebApp', [
  'ngRoute',
  'ngCookies',
  'btford.socket-io',
  'ui.bootstrap',
  'angularMoment',
  'magntDirective',
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
      when('/magnets/:magnetId', {
        templateUrl: 'partials/magnet-view.html',
        controller: 'MagnetViewCtrl'
      }).
      when('/magnets/:magnetId/qa/:questionId/answer', {
        templateUrl: 'partials/answer-question.html',
        controller: 'ListAnswers'
      });
}]);
magntWebApp.run(function($rootScope, userData){
  $rootScope.errors = [
    "Thanks for logging in!",
    "There was an error logging in",
    "Good bye",
    "Got your question",
    "Connection failed"
  ];
  userData.getToken();
  userData.getUserId();
});

magntWebApp.factory('signIn', ['$rootScope','$http', '$location', 'userData', function ($rootScope, $http, $location, userData) {
  return {
    login: function(userEmail, userPassword) {
        $http.post('http://api.magnt.co/api/people/login',
        {email: userEmail, password:userPassword}).
          success(function(data, status, headers, config){
            if(status == 200) {
                userData.setToken(data.id);
                $location.path('/magnets/1');
            }
            else {
              /*
              $scope.loginResult = "A user with that email and password combination does not exist.";
              */
            }
          }).
          error(function(data, status, headers, config){
            /*
            $scope.loginResult = "A user writh that email and password combination does not exist";
            */
          });
          return 0;
    }
  }
}]);

magntWebApp.factory('magSocket', function (socketFactory) {
  var magIoSocket = io.connect('http://chat.magnt.co');

  magSocket = socketFactory({
    ioSocket: magIoSocket
  })

  return magSocket;
});

magntWebApp.factory('userData', ['$cookies','$rootScope', function($cookies, $rootScope) {
  var nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  return {
    getToken: function() {
      if($rootScope.tokenId) {
        return $rootScope.tokenId;
      }
      else if($cookies.get('tokenId')) {
        $rootScope.tokenId = $cookies.get('tokenId');
        return $cookies.get('tokenId');
      }
      else {
        return 0;
      }
    },
    setToken: function(tokenId) {
      $rootScope.tokenId = tokenId;
      $cookies.put('tokenId', tokenId, [{expires:nextWeek}]);
    },
    setUserId: function(userId) {
      $rootScope.userId = userId;
      $cookies.put('userId', userId, [{expires:nextWeek}]);
    },
    getUserId: function() {
      if($rootScope.userId) {
        return $rootScope.userId;
      }
      else if($cookies.get('userId')) {
        $rootScope.userId = $cookies.get('userId');
        return $cookies.get('userId');
      }
      else {
        return 0;
      }
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
    },
    singleAnswer: function(answerid) {
      return $http.get('http://api.magnt.co/api/answers/' + answerid + '?filter[include]=person');
    }
  }
}]);
magntWebApp.factory('apiChat', ['$http', function($http) {
  var messagelist = [];
  return {
    getMsgs: function(magnetid) {
      return $http.get('http://api.magnt.co/api/msgs?filter[where][magnetid]=' + magnetid + '&filter[include]=person');
    }
  }
}]);
