import * as angular from 'angular';

angular.module('app')
    .controller('MainCtrl', function($http, $scope) {

        $scope.sendEmail = async function() {
            $scope.contactForm.statusText = 'Submitting message..';
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
                $scope.contactForm.statusText = 'An error occurred!';
            }
            $scope.$apply();
        }
    });
