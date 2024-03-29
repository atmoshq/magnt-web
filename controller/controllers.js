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
    $http.post('http://api.magnt.co/api/people',
    {fname: signupDetails.userFname, lname: signupDetails.userLname, email: signupDetails.userEmail, password:signupDetails.userPass}).
      success(function(data, status, headers, config){
        if(status == 200) {
          $scope.signupResult = "Thanks for making an account!";
        }
        else {
          $scope.signupResult = "That account already exists. Are you sure you aren't trying to sign in? ";
        }
      }).
      error(function(data, status, headers, config){
        if(status === 422){
          $scope.signupResult = "An account with that email already exists!"
        }
      });
  }
}]);

// Welcome View
magntControllers.controller('WelcomeView', ['$scope', '$http', '$location', 'userData', 'signIn', function($scope, $http, $location, userData, signIn){
    if(!userData.getToken){
      $scope.login = {};
      $scope.login.submitLogin = function(item, event) {
        var loginDetails = {
          userEmail: $scope.login.userEmail,
          userPassword: $scope.login.userPassword
        };
        signIn.login(loginDetails.userEmail, loginDetails.userPassword);
      }
    }
    else {
      $location.path('magnets/1');
    }
}]);

// List Magnets
magntControllers.controller('MagnetListCtrl', ['$scope', '$http', '$location', 'userData', function($scope, $http ,$location, userData){
  if(userData.getToken()){
    $http.get('http://api.magnt.co/api/magnets').
      success(function (data, status, headers, config){
        $scope.magnetList = data;
      }).
      error(function (data, status, headers, config){
      });
  }
  else {
    $location.path('/');
  }
}]);

// Magnet View
magntControllers.controller('MagnetViewCtrl', ['$scope', '$http', '$location', '$routeParams', '$anchorScroll', function($scope, $http ,$location, $routeParams, $anchorScroll){
  $scope.magnetId = $routeParams.magnetId;
  $http.get('http://api.magnt.co/api/magnets/' + $routeParams.magnetId).
    success(function (data, status, headers, config){
      $scope.magnetInfo = data;
    }).
    error(function (data, status, headers, config){
    });
}]);

// List questions
magntControllers.controller('QuestionListCtrl', ['$scope', '$http', 'apiQuestions', 'apiAnswers', function($scope, $http , apiQuestions, apiAnswers){
  $scope.isCollapsed = false;
  $scope.pickQuestion = {};
  $scope.pickQuestion.go = function(item, event){
    apiAnswers.getAnswers(item).then(function(d){
      $scope.answerList = d.data;
    });
  };
  apiQuestions.getQuestions($scope.magnetId).then(function(d) {
    $scope.questionList = d.data;
    console.log($scope.questionList);
  });
}]);

// Post question
magntControllers.controller('AskQuestion', ['$scope', '$http', '$routeParams', '$timeout', 'userData', 'apiQuestions', function($scope, $http, $routeParams, $timeout, userData, apiQuestions){
  $scope.ask = {};
  $scope.ask.submitQuestion = function(item, event) {
    var askDetails = {
      questionText: $scope.ask.questionText,
      magnetid: $routeParams.magnetId,
      personid: userData.getUserId()
    };
    $http.post('http://api.magnt.co/api/questions',
    {questionText: askDetails.questionText, personid: askDetails.personid, magnetid: askDetails.magnetid, up:1, down:0}).
      success(function(data, status, headers, config){
        if(status == 200) {
          $scope.askResult = "Got your question.";
        }
        else {
          $scope.askResult = "There was an error submitting your question";
        }
      }).
      error(function(data, status, headers, config){
        $scope.askResult = "There was an error submitting your question";
      });
  }
}]);

// List Answers

magntControllers.controller('ListAnswers', ['$scope', '$http', '$routeParams', 'userData', 'apiAnswers', 'apiQuestions', function($scope, $http, $routeParams, userData, apiAnswers, apiQuestions){
  apiAnswers.getAnswers($scope.questionId).then(function(d) {
    $scope.answerList = d.data;
  });
  apiQuestions.singleQuestion($scope.questionId).then(function(d) {
    $scope.currentQuestion = d.data;
  });
}]);


// Post answer

magntControllers.controller('AnswerQuestion', ['$scope', '$http', '$location', '$routeParams', '$timeout', 'userData', 'apiAnswers', function($scope, $http , $location, $routeParams, $timeout, userData, apiAnswers){
  $scope.questionId = $routeParams.questionId;
  $scope.answer = {};
  $scope.answer.submitAnswer = function(item, event) {
    var answerDetails = {
      answertext: $scope.answer.answerText,
      magnetid: $routeParams.magnetId,
      questionid: $scope.questionId,
      personid: userData.getUserId()
    };
    $http.post('http://api.magnt.co/api/answers',
    {answertext: answerDetails.answertext, personid: answerDetails.personid, questionid: answerDetails.questionid}).
      success(function(data, status, headers, config){
        if(status == 200) {
          $scope.answerResult = "Got your answer!";
          apiAnswers.singleAnswer(data.id).then(function(d) {
            $timeout(function(){
              $scope.$apply(function(){
                $scope.answerList.push(d.data);
              });
            }, 0);
          });
        }
        else {
          $scope.answerResult = "There was an error submitting your answer";
        }
      }).
      error(function(data, status, headers, config){
        $scope.answerResult = "There was an error submitting your answer";
      });
  }
}]);


/*
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
                             _          _           _
                            | |        | |         | |
 _ __ ___   __ _  __ _ _ __ | |_    ___| |__   __ _| |_
| '_ ` _ \ / _` |/ _` | '_ \| __|  / __| '_ \ / _` | __|
| | | | | | (_| | (_| | | | | |_  | (__| | | | (_| | |_
|_| |_| |_|\__,_|\__, |_| |_|\__|  \___|_| |_|\__,_|\__|
                  __/ |
                 |___/

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

*/
// Chat view

magntControllers.controller('chatView', ['$scope', '$http', '$routeParams', 'userData', 'apiChat', 'magSocket', function($scope, $http, $routeParams, userData, apiChat, magSocket){
  $scope.messagelist = {};
  $http.get('http://api.magnt.co/api/magnets/' + $routeParams.magnetId).
    success(function (data, status, headers, config){
      $scope.magnetInfo = data;
    }).
    error(function (data, status, headers, config){
    });
  var whatMagnet = $routeParams.magnetId;
  magSocket.on('chat out', function(data){
    $scope.$apply(function(){
      $scope.messagelist.push(data);
    });
  });
  apiChat.getMsgs(whatMagnet).then(function(d) {
    $scope.messagelist = d.data;
  });
}]);
magntControllers.controller('chatSend', ['$scope', '$http', '$routeParams', 'userData', 'apiChat', 'magSocket', function($scope, $http, $routeParams, userData, apiChat, magSocket){
  $scope.chat= {};
  $scope.chat.submitMsg = function(item, event) {
    console.log("got a message");
    var msgDetails = {
      text: $scope.chat.msgText,
      personid: userData.getUserId(),
      magnetid: $routeParams.magnetId
    };
    magSocket.emit('chat message', msgDetails);
  }
}]);
