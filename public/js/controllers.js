'use strict';

var postsControllers = angular.module('postsControllers', []);

postsControllers.controller('MainCtrl',
['$scope', '$location', '$http',
function MainCtrl($scope, $location, $http) {
    $scope.message = "Main";
    $location.path('/posts');
}]);

// Load posts
postsControllers.controller('ShowCtrl',
['$scope', 'PostsList',
function ShowCtrl($scope, PostsList) {
    $scope.postsList = new Array();
    PostsList.get({},
        function success(response) {
            $scope.postsList = response.posts;
            console.log(response);
            console.log("Success:" + JSON.stringify(response));
        },
        function error(errorResponse) {
            console.log("Error:" + JSON.stringify(errorResponse));
        }
);

}]);

// Add posts
postsControllers.controller('PostAddCtrl',
['$scope', 'Post', '$location',
function PostAddCtrl($scope, Post, $location) {
    $scope.submit = function(){
        $scope.sub = true;

        var post = {
            "title" : $scope.title,
            "description" : $scope.description
        };

        Post.save({}, post,
            function success(response) {
                console.log("Success:" + JSON.stringify(response));
            },
            function error(errorResponse) {
                console.log("Error:" + JSON.stringify(errorResponse));
            }
        );
        $location.path('/posts');
    };
}]);

// Edit posts - show
postsControllers.controller('ShowSingleCtrl',
['$scope', '$routeParams','Post',
function ShowCtrl($scope, $routeParams, Post) {
     Post.get({id: $routeParams.id},
        function success(response) {
            $scope.post = response.post;
            $scope.title = response.post.title;
            $scope.description = response.post.description;
            console.log(response);
            console.log("Success:" + JSON.stringify(response));
        },
        function error(errorResponse) {
            console.log("Error:" + JSON.stringify(errorResponse));
        }
      );
}]);

// Edit posts - update
postsControllers.controller('PostEditCtrl',
['$scope', '$routeParams', '$location','Post',
function PostEditCtrl($scope, $routeParams, $location, Post, $http) {
    $scope.update = function(postId){
      // console.log(postId);
        var post = {
          "title" : $scope.title,
          "description" : $scope.description
        };

        Post.update({id: postId}, post,
        function success(response){
            console.log("Success: " + JSON.stringify(response));
            $location.path('/posts');
        },
        function error(errorResponse) {
            console.log("Error: " + JSON.stringify(errorResponse));
        }
    );
  };
}]);

// Delete posts
postsControllers.controller('PostDeleteCtrl',
['$scope', '$location', 'Post',
function PostEditCtrl($scope, $location, Post) {
    $scope.delete = function(postId) {

    // console.log(postId);
    Post.delete({id: postId},
        function success(response){
            console.log("Success: " + JSON.stringify(response));
        },
        function error(errorResponse) {
            console.log("Error: " + JSON.stringify(errorResponse));
        }
    );
    $location.path('/posts');
};
}]);

// Users
postsControllers.controller('UserSignupCtrl',
['$scope', '$location',
  function UserCtrl($scope, $location) {
    $scope.message = "Singup";
    $location.path('/users/signup');
}]);
