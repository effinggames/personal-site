(function() {
    'use strict';
    const angular = window.angular;

    angular.module('app')
        .controller('MainCtrl', function($http, $scope, $window) {
            $scope.$window = $window;

            $scope.sendEmail = function() {
                $scope.contactForm.statusText = 'Submitting message..';
                $http.post('/api/sendEmail', {
                    senderName: $scope.contactForm.senderName,
                    email: $scope.contactForm.email,
                    subject: $scope.contactForm.subject,
                    message: $scope.contactForm.message,
                }).then(rsp => {
                    if (rsp.data.status === 'OK') {
                        $scope.contactForm.senderName = $scope.contactForm.email = $scope.contactForm.subject = $scope.contactForm.message = null;
                        $scope.contactForm.statusText = 'Message successfully sent. Thanks!';
                    } else {
                        $scope.contactForm.statusText = 'An unknown error occurred!';
                    }
                })
            }
        });
})();