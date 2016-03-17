import 'babel-polyfill';
import * as angular from 'angular';
import * as InstantClick from 'instantclick';

angular.module('app', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./', true, /^(?!\.\/App.js).*\.js$/));

const initApp = function() {
    angular.bootstrap(document.body, ['app']);
};
initApp();

InstantClick.init(50);
InstantClick.on('change', function() {
    initApp();
});