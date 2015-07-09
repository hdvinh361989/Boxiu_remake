app.controller('product_adminCtrl', ['$meteor', '$scope', '$ionicPopup',
    function ($meteor, $scope, $ionicPopup) {
        //Init search
        $scope.searchTxt = '';

        //Init data
        $scope.data = {
            showDelete: false
        };
        $scope.showDelete = function () {
            $scope.data.showDelete = !$scope.data.showDelete;
        };

        //Init sorts
        $scope.sorts = [
            {
                label: 'Sort by name Ascending',
                expression: {name: 1}
            },
            {
                label: 'Sort by name Descending',
                expression: {name: -1}
            },
            {
                label: 'Sort by price Ascending',
                expression: {price: 1}
            },
            {
                label: 'Sort by price Descending',
                expression: {price: -1}
            },
            {
                label: 'Sort by created date Ascending',
                expression: {createdDate: 1}
            },
            {
                label: 'Sort by created date Descending',
                expression: {createdDate: -1}
            }
        ];

        //Init pagination
        $scope.perPage = 8;
        $scope.page = 1;
        $scope.selectedSort = $scope.sorts[0].expression;

        //Subscript
        //Cho biet productCount da dc khoi tao hay chua
        var isInitCount = false;
        $meteor.autorun($scope, function () {
            $meteor.subscribe('product_admin', {
                limit: parseInt($scope.getReactively('perPage')),
                skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
                sort: $scope.getReactively('selectedSort')
            }, $scope.getReactively('searchTxt')).then(function () {

                $scope.productCount = $meteor.object(Counts, 'numberOfProduct', false);
                isInitCount = true;
                // Sau khi load xong phai phat ra event bao ket thuc
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        });

        //Collection binding
        $scope.products = $meteor.collection(function () {
            return Product.find({}, {
                sort: $scope.getReactively('selectedSort')
            })
        }, false);


        //Other method
        //Convert datetime to client timezone
        $scope.createdDate = function (createdDate) {
            if (createdDate) {
                return new Date(createdDate);
            }
        };
        //Check can be load more data or not
        $scope.isMoreDataCanBeLoad = isMoreDataCanBeLoad;
        function isMoreDataCanBeLoad() {
            if (isInitCount)
                return parseInt($scope.productCount.count) > $scope.perPage * $scope.page;
            return false;
        }

        //Operation method
        //Delete product
        $scope.delete = remove;
        function remove(product, ev) {
            $scope.products.remove(product);
        }

        //Load more on infinite scroll
        var firstTime = true;
        $scope.loadMore = loadMore();

        function loadMore() {
            if (firstTime) {
                firstTime = false;
            } else {
                $scope.page += 1;
            }
        }

    }]);