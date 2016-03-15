(function() {
    'use strict';
    const angular = window.angular;

    angular.module('app', []).config(function($interpolateProvider){
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    });
})();


