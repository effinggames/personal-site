import 'angular';
import 'babel-polyfill'
import * as angular from 'angular';

angular.module('app', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./', true, /^(?!\.\/App.js).*\.js$/));

