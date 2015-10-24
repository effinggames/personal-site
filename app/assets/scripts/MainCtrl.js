(function () {
    'use strict';
    const angular = window.angular;

    angular.module('app')
        .controller('MainCtrl', function($http, $scope, $window) {
            $scope.$window = $window;

            $scope.sendEmail = function() {
                $http.post('/api/sendEmail', {
                    senderName: $scope.contactForm.senderName,
                    email: $scope.contactForm.email,
                    subject: $scope.contactForm.subject,
                    message: $scope.contactForm.message,
                })
                console.log('test', $scope.contactForm, $scope);
            }
        });
})();