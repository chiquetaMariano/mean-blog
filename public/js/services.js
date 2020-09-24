/* chapter7/services.js complete file */
'use strict';
/* Services */
var postsServices =
angular.module('postsServices', ['ngResource']);

// var headers = {
//     // 'Authorization': 'Basic ' + btoa(username + ":" + password),
//     'Access-Control-Allow-Origin': true,
//     'Content-Type': 'application/json; charset=utf-8',
//     "X-Requested-With": "XMLHttpRequest"
//     }

postsServices.factory('Post', ['$resource',
function($resource) {
    return $resource("./NodePosts/posts/:id",
    {}, {
        get: {method: 'GET', cache: false, isArray: false},
        save: {method: 'POST', cache: false, isArray: false},
        update: {method: 'PUT', cache: false, isArray: false},
        delete: {method: 'DELETE', cache: false, isArray: false}
    });
}
]);

postsServices.factory('PostsList', ['$resource',
function($resource) {
    return $resource("./NodePosts/posts",
    {}, {
        get: {method: 'GET', cache: false, isArray: false}
    });
}
]);
