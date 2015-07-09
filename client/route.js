/**
 * Created by vinh on 6/12/2015.
 */
app.run(["$rootScope", "$state", function ($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireUser promise is rejected
        // and redirect the user back to the main page
        switch (error) {
            case "AUTH_REQUIRED":
                $state.go('adminLogin');
                break;
            case 'UNAUTHORIZED' :
                $state.go('unauthorized');
                break;
        }
    });
}]);


angular.module("boxiu").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function ($urlRouterProvider, $stateProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            //error
            .state('unauthorized', {
                template: '<h1>You are unauthorized</h1>'
            })
            //User view
            .state('user', {
                templateUrl: 'client/client/main.ng.html'
            })
            .state('user.home', {
                url: '/',
                //views: {
                // 'menu': {templateUrl: 'client/menu/views/menu.ng.html', controller: 'menuCtrl'}
                //}
                templateUrl: 'client/client/home/views/home.ng.html'
                //controller: 'homeCtrl'
            })
            .state('user.blog', {
                url: '/blog',
                templateUrl: 'client/client/blog/views/postsList.ng.html'
            })
            .state('user.postDetail', {
                url: '/blog/:postID',
                templateUrl: 'client/client/blog/views/postDetail.ng.html'
            })
            .state('user.product', {
                url: '/product',
                templateUrl: 'client/client/product/views/productList.ng.html'
            })
            .state('user.productDetail', {
                url: '/product/:productID',
                templateUrl: 'client/client/product/views/productDetail.ng.html'
            })

            //Admin view
            .state('admin', {
                url: '/admin',
                abstract: true,
                templateUrl: 'client/admin/views/main.ng.html',
                resolve: {
                    "currentUser": ['$meteor', function ($meteor) {
                        return $meteor.requireValidUser(function (user) {
                            if (!Roles.userIsInRole(user._id, ['admin'])) {
                                console.log('UNAUTHORIZED');
                                return "UNAUTHORIZED";
                            }
                            return true;
                        })
                    }]
                },
                controller: 'mainCtrl'

            })
            .state('admin.dashboard', {
                url: '/dashboard',
                templateUrl: 'client/admin/views/dashboard.ng.html'
            })
            .state('adminLogin', {
                url: '/admin/login',
                templateUrl: 'client/admin/views/login.ng.html',
                controller: 'login_adminCtrl'
            })
            //category
            .state('admin.category', {
                url: '/category',
                templateUrl: 'client/category/views/category.ng.html',
                controller: 'categoryCtrl'
            })
            //tag
            .state('admin.tag', {
                url: '/tag',
                templateUrl: 'client/tag/views/tag.ng.html',
                controller: 'tagCtrl'
            })
            //product
            .state('admin.product', {
                url: '/product',
                abstract: true,
                templateUrl: 'client/product/views/product.ng.html'
            })
            .state('admin.product.list', {
                url: '/list',
                templateUrl: 'client/product/views/product_list.ng.html',
                controller: 'product_adminCtrl'
            })
            .state('admin.product.edit', {
                url: '/edit',
                templateUrl: 'client/product/views/product_edit.ng.html',
                controller: 'product_edit_adminCtrl'
            })
        ;

        $urlRouterProvider.otherwise("/");
    }]);