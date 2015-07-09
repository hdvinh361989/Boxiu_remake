/**
 * @ngdoc function
 * @name boxiu.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the boxiu
 */
app
    .controller('mainCtrl', ['$scope', '$meteor', '$state', function ($scope, $meteor, $state) {
        $scope.menus = [
            {
                title: 'Dashboard',
                state: 'admin.dashboard'
            },
            {
                title: 'Products',
                state: 'admin.product.list'
            },
            {
                title: 'Posts',
                state: 'admin.post'
            },
            {
                title: 'Category',
                state: 'admin.category'
            },
            {
                title: 'Tag',
                state: 'admin.tag'
            }
        ];
        $scope.oneAtATime = true;

        $scope.logout = function () {
            $meteor.logout().then(function () {
                console.log('Logout Success');
                $state.go('adminLogin');
            }, function (err) {
                console.log('Logout error: ', err);
            })
        }
    }]);
