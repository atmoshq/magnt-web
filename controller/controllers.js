// module
var magntControllers = angular.module('magntControllers', []);

// Signup view
magntControllers.controller('SignupView', ['$scope', '$http', function($scope, $http){
  $scope.signup = {};
  $scope.signup.submitSignup = function(item, event) {
    var signupDetails = {
      userFname: $scope.signup.userFname,
      userLname: $scope.signup.userLname,
      userEmail: $scope.signup.userEmail,
      userPass: $scope.signup.userPassword
    };
    console.log(signupDetails);
    $http.post('http://api.magnt.co/api/people',
    {fname: signupDetails.userFname, lname: signupDetails.userLname, email: signupDetails.userEmail, password:signupDetails.userPass}).
      success(function(data, status, headers, config){
        if(status == 200) {
          $scope.signupResult = "Thanks for making an account!";
        }
        else {
          $scope.signupResult = "Something went seriously wrong yo";
        }
      }).
      error(function(data, status, headers, config){
        $scope.signupResult = "Something went seriously wrong yo";
      });
  }
}]);

// Welcome View
magntControllers.controller('WelcomeView', ['$scope', '$http', '$location', 'userData', function($scope, $http, $location, userData){
  if(!userData.getToken()){
    $scope.login = {};
    $scope.login.submitLogin = function(item, event) {
      var loginDetails = {
        userEmail: $scope.login.userEmail,
        userPassword: $scope.login.userPassword
      };
      $http.post('http://api.magnt.co/api/people/login',
      {email: loginDetails.userEmail, password:loginDetails.userPassword}).
        success(function(data, status, headers, config){
          if(status == 200) {
            userData.setToken(data.id);
            userData.setUserId(data.userId);
            if(userData.getToken()){
              $scope.loginResult = "Thanks for logging in!";
              $location.path('/magnets');
            }
          }
          else {
            $scope.loginResult = "Something went seriously wrong yo";
          }
        }).
        error(function(data, status, headers, config){
          $scope.loginResult = "Something went seriously wrong yo";
        });
      }
    }
    else{
      $location.path('/magnets');
    }
}]);

// List Magnets
magntControllers.controller('MagnetListCtrl', ['$scope', '$http', '$location', 'userData', 'userResolver', function($scope, $http ,$location, userData, userResolver){
  if(userData.getToken()){
    $http.get('http://api.magnt.co/api/magnets').
      success(function (data, status, headers, config){
        $scope.magnetList = data;
      }).
      error(function (data, status, headers, config){
      });
    console.log(userData.getUserId());
  }
  else {
    $location.path('/');
  }
}]);

// List questions

magntControllers.controller('QuestionListCtrl', ['$scope', '$http', '$routeParams', 'userData', function($scope, $http, $routeParams, userData){
  $scope.magnetId = $routeParams.magnetId;
  console.log(userData.getUserId());
  $http.get('http://api.magnt.co/api/qas?filter[where][magnetId]=' + $routeParams.magnetId).
    success(function (data, status, headers, config){
      $scope.questionList = data;
    }).
    error(function (data, status, headers, config){
    });
}]);

// List Answers

magntControllers.controller('ListAnswers', ['$scope', '$http', '$routeParams', 'userData', function($scope, $http, $routeParams, userData){
  $scope.questionId = $routeParams.questionId;
  console.log(userData.getUserId());
  $http.get('http://api.magnt.co/api/qas/' + $routeParams.questionId).
    success(function (data, status, headers, config){
      $scope.answersList = data.answers;
      console.log(data.answers);
    }).
    error(function (data, status, headers, config){
    });
}]);

// Post question
magntControllers.controller('AskQuestion', ['$scope', '$http', '$routeParams', 'userData', function($scope, $http, $routeParams, userData){
  $scope.questionAsk = {};
  $scope.questionAsk.submitQuestion = function(item, event) {
    var questionAskDetails = {
      questionText: $scope.questionAsk.questionText,
      whichMagnet: $routeParams.magnetId,
      userId: userData.getUserId()
    };
    console.log(questionAskDetails);
    console.log(userData.getUserId());
    $http.post('http://api.magnt.co/api/qas',
    {userId: userData.getUserId(), question: questionAskDetails.questionText, magnetId:questionAskDetails.whichMagnet, answers:[]}).
      success(function(data, status, headers, config){
        if(status == 200) {
          $scope.questionAskResult = "Thanks for making an account!";
        }
        else {
          $scope.questionAskResult = "Something went seriously wrong yo";
        }
      }).
      error(function(data, status, headers, config){
        $scope.questionAskResult = "Something went seriously wrong yo";
      });
  }
}]);

// Post answer

magntControllers.controller('AnswerQuestion', ['$scope', '$http', '$location', '$routeParams', 'userData', function($scope, $http , $location, $routeParams, userData){
  $scope.questionId = $routeParams.questionId;
  $scope.answer = {};
  $scope.answer.submitAnswer = function(item, event) {
    var answerDetails = {
      answerText: $scope.answer.answerText
    };
    $scope.userId = userData.getUserId();
    $http.post('http://api.magnt.co/api/qas/addAnswer',
    {qaId: $routeParams.questionId, answerText: answerDetails.answerText, poster: $scope.userId}).
      success(function(data, status, headers, config){
        if(status == 200) {
          $scope.answerResult = "Got it";
        }
        else {
          $scope.answerResult = "Answer wasn't posted, try again please.";
        }
      }).
      error(function(data, status, headers, config){
        $scope.answerResult = "Answer wasn't posted, try again please.";
      });
  }
}]);
