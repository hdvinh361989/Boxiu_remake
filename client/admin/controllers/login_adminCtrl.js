/**
 * Created by vinh on 6/22/2015.
 */
app.controller('login_adminCtrl', ['$scope', '$meteor', '$state', '$ionicPopup', function ($scope, $meteor, $state, $ionicPopup) {
    //Init
    $scope.user = {
        username: '',
        password: ''
    };

    //Logic
    $scope.login = function () {
        $scope.isPending = true;
        Meteor.loginWithPassword($scope.user.username, $scope.user.password, function (err) {
            //on error
            if (err) {
                var alert_error = $ionicPopup.alert({
                    title: 'Message',
                    template: 'Login error' + err
                });
            }
            //on success
            $state.go('admin.dashboard');
        })
    }
}]);