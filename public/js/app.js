'use strict';

/* App Module */
var notesApp = angular.module('notesApp', [
    'ngRoute',
    'notesControllers',
    'notesServices'
]);

notesApp.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
    }).when('/notes', {
        templateUrl: 'partials/all-notes.html',
        controller: 'ShowCtrl'
    }).when('/notes/add', {
        templateUrl: 'partials/new-note.html',
        controller: 'NoteAddCtrl'
    }).when('/notes/edit/:id', {
        templateUrl: 'partials/edit-note.html',
        controller: 'ShowSingleCtrl'
    }).when('/users/signup',{
      templateUrl: 'partials/users/signup.html',
      controller: 'UserSignupCtrl'
    }).when('/users/signin',{
      templateUrl: 'partials/users/signin.html',
      controller: 'UserSigninCtrl'
    });

    $locationProvider.html5Mode(false).hashPrefix('!');
}]);
