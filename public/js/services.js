/* chapter7/services.js complete file */
'use strict';
/* Services */
var notesServices =
angular.module('notesServices', ['ngResource']);

// var headers = {
//     // 'Authorization': 'Basic ' + btoa(username + ":" + password),
//     'Access-Control-Allow-Origin': true,
//     'Content-Type': 'application/json; charset=utf-8',
//     "X-Requested-With": "XMLHttpRequest"
//     }

notesServices.factory('Note', ['$resource',
function($resource) {
    return $resource("./NodeNotes/notes/:id",
    {}, {
        get: {method: 'GET', cache: false, isArray: false},
        save: {method: 'POST', cache: false, isArray: false},
        update: {method: 'PUT', cache: false, isArray: false},
        delete: {method: 'DELETE', cache: false, isArray: false}
    });
}
]);

notesServices.factory('NotesList', ['$resource',
function($resource) {
    return $resource("./NodeNotes/notes",
    {}, {
        get: {method: 'GET', cache: false, isArray: false}
    });
}
]);
