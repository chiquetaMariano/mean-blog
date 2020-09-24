'use strict';

/* App Module */
var postsApp = angular.module('postsApp', [
    'ngRoute',
    'postsControllers',
    'postsServices'
]);

postsApp.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
    }).when('/posts', {
        templateUrl: 'partials/all-posts.html',
        controller: 'ShowCtrl'
    }).when('/posts/add', {
        templateUrl: 'partials/new-post.html',
        controller: 'PostAddCtrl'
    }).when('/posts/edit/:id', {
        templateUrl: 'partials/edit-post.html',
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
