import * as angular from 'angular';

angular.module('app')
    .controller('ContactFormCtrl', function($http, $scope) {
        $scope.sendEmail = async function() {
            $scope.contactForm.statusText = 'Submitting message..';
            try {
                var rsp = await $http.post('/api/sendEmail', {
                    senderName: $scope.contactForm.senderName,
                    email: $scope.contactForm.email,
                    subject: $scope.contactForm.subject,
                    message: $scope.contactForm.message,
                });

                if (rsp.data.status === 'OK') {
                    $scope.contactForm.senderName = $scope.contactForm.email = $scope.contactForm.subject = $scope.contactForm.message = null;
                    $scope.contactForm.statusText = 'Message successfully sent. Thanks!';
                } else {
                    throw new Error('Failed Request');
                }
            } catch(err) {
                $scope.contactForm.statusText = 'An error occurred!';
            }
            $scope.$digest();
        }
    });
