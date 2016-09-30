import * as angular from 'angular';

angular.module('app')
    .controller('ContactFormCtrl', function($http, $scope) {
        $scope.sendEmail = function() {
            $scope.contactForm.statusText = 'Submitting message..';

            $http.post('/api/sendEmail', {
                senderName: $scope.contactForm.senderName,
                email: $scope.contactForm.email,
                subject: $scope.contactForm.subject,
                message: $scope.contactForm.message,
            }).then(function(rsp) {
                if (rsp.data.status === 'OK') {
                    $scope.contactForm.senderName = $scope.contactForm.email = $scope.contactForm.subject = $scope.contactForm.message = null;
                    $scope.contactForm.statusText = 'Message successfully sent. Thanks!';
                } else {
                    throw new Error('Failed Request');
                }
            }).catch(function(err) {
                $scope.contactForm.statusText = 'An error occurred!';
            });
        }
    });
