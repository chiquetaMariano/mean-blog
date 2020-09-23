'use strict';

var notesControllers = angular.module('notesControllers', []);

notesControllers.controller('MainCtrl',
['$scope', '$location', '$http',
function MainCtrl($scope, $location, $http) {
    $scope.message = "Main";
    $location.path('/notes');
}]);

// Load notes
notesControllers.controller('ShowCtrl',
['$scope', 'NotesList',
function ShowCtrl($scope, NotesList) {
    $scope.notesList = new Array();
    NotesList.get({},
        function success(response) {
            $scope.notesList = response.notes;
            console.log(response);
            console.log("Success:" + JSON.stringify(response));
        },
        function error(errorResponse) {
            console.log("Error:" + JSON.stringify(errorResponse));
        }
);

}]);

// Add notes
notesControllers.controller('NoteAddCtrl',
['$scope', 'Note', '$location',
function NoteAddCtrl($scope, Note, $location) {
    $scope.submit = function(){
        $scope.sub = true;

        var note = {
            "title" : $scope.title,
            "description" : $scope.description
        };

        Note.save({}, note,
            function success(response) {
                console.log("Success:" + JSON.stringify(response));
            },
            function error(errorResponse) {
                console.log("Error:" + JSON.stringify(errorResponse));
            }
        );
        $location.path('/notes');
    };
}]);

// Edit notes - show
notesControllers.controller('ShowSingleCtrl',
['$scope', '$routeParams','Note',
function ShowCtrl($scope, $routeParams, Note) {
     Note.get({id: $routeParams.id},
        function success(response) {
            $scope.note = response.note;
            $scope.title = response.note.title;
            $scope.description = response.note.description;
            console.log(response);
            console.log("Success:" + JSON.stringify(response));
        },
        function error(errorResponse) {
            console.log("Error:" + JSON.stringify(errorResponse));
        }
      );
}]);

// Edit notes - update
notesControllers.controller('NoteEditCtrl',
['$scope', '$routeParams', '$location','Note','$http',
function NoteEditCtrl($scope, $routeParams, $location, Note, $http) {
    $scope.update = function(noteId){
      // console.log(noteId);
        var note = {
          "title" : $scope.title,
          "description" : $scope.description
        };

        Note.update({id: noteId}, note,
        function success(response){
            console.log("Success: " + JSON.stringify(response));
        },
        function error(errorResponse) {
            console.log("Error: " + JSON.stringify(errorResponse));
        }
    );
  };
}]);

// Delete notes
notesControllers.controller('NoteDeleteCtrl',
['$scope', '$location', 'Note',
function NoteEditCtrl($scope, $location, Note) {
    $scope.delete = function(noteId) {

    // console.log(noteId);
    Note.delete({id: noteId},
        function success(response){
            console.log("Success: " + JSON.stringify(response));
        },
        function error(errorResponse) {
            console.log("Error: " + JSON.stringify(errorResponse));
        }
    );
    $location.path('/notes');
};
}]);

// Users
notesControllers.controller('UserSignupCtrl',
['$scope', '$location', '$http',
  function UserCtrl($scope, $location, $http) {
    $scope.message = "Singup";
    $location.path('/users/signup');
}]);
