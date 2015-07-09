/**
 * Created by vinh on 6/25/2015.
 */
app.controller('categoryCtrl', ['$scope', '$meteor', function ($scope, $meteor) {
    //initial
    $meteor.subscribe('category admin');
    $scope.searchTxt = '';
    $scope.newCategory = {};
    $scope.search = search;
    $scope.save = save;
    $scope.reset = reset;
    $scope.tags = $meteor.collection(function () {
        return Category.find({}, {sort: {name: 1}});
    });
    $scope.selectedCategories = [];
    $scope.toggle = toggle;
    $scope.delete = deleteCategories;

    //init table
    $scope.table = {};

    $scope.table.columns = [
        {
            name: 'name',
            displayName: false,
            width: 25
        },
        {
            name: 'description',
            displayName: true,
            width: 40,
            class: 'shortDescription'
        },
        {
            name: 'count',
            displayName: true,
            width: 20
        }
    ];

    function search(query) {
        if (query) {
            query = query.trim();
            myPattern = '.*' + query + '.*';
            return $meteor.collection(function () {
                return Category.find({
                    name: {
                        $regex: myPattern,
                        $options: 'i'
                    }
                });
            })
        }
    }

    function save(category, parentCate) {
        if (category._id) {
            category.save();
        } else {
            //insert parent id
            if (parentCate) {
                category.parent = parentCate._id;
            }
            //insert category type
            category.type = 'product';

            //Insert operation
            Category.insert(category, function (err, id) {
                if (err) {
                    console.log('Insert error: ', err);
                    return;
                }
                $scope.newCategory = $meteor.object(Category, id, false);
                // Neu parentCate co ton tai thi kiem tra tiep children property
                // children property ton tai thi push newCategory._id nguoc lai
                // gan children voi 1 mang chua newCategory._id
                if (parentCate) {
                    parentCate.children ? parentCate.children.push($scope.newCategory._id) : parentCate.children = [$scope.newCategory._id];
                    Category.update({_id: parentCate._id}, {$set: {children: parentCate.children}});
                }
                $scope.newCategory = {};
                $scope.selectedParent = '';
                $scope.searchTxtParent = '';

            })
        }
    }

    function reset() {
        if ($scope.newCategory._id) {
            $scope.newCategory.reset();
            $scope.selectedParent = $scope.newCategory.parent ? $scope.newCategory.parent : '';
            return;
        }
        $scope.newCategory = {};
        $scope.selectedParent = '';
    }

    function toggle(cate, list) {
        var idx = list.indexOf(cate);
        if (idx > -1) {
            list.splice(idx, 1);
            // kiem tra neu list da empty thi reset newCategory
            if (list.length === 0) {
                $scope.newCategory = {};
                return;
            }
            $scope.newCategory = $meteor.object(Category, list[list.length - 1]._id, false);
        } else {
            list.push(cate);
            $scope.newCategory = $meteor.object(Category, cate._id, false);
        }
    }

    function deleteCategories(list) {
        $scope.tags.remove(list);

        //reset list
        list = [];
    }
}]);