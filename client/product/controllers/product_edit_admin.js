/**
 * Created by vinh on 7/4/2015.
 */
app.controller('product_edit_adminCtrl', ['$scope', '$meteor', '$ionicPopup', '$ionicModal',
    function ($scope, $meteor, $ionicPopup, $ionicModal) {
        //Init
        $scope.newProduct = {
            profile: {
                type: 'box'
            },
            category: [],
            tags: [],
            parentBoxes: [],
            childProducts: []
        };
        $scope.selectedCates = [];
        $scope.selectedTags = [];
        $scope.selectedParentBoxes = [];
        $scope.selectedChildProducts = [];
        $scope.data = {
            types: [
                {
                    label: 'Box',
                    value: 'box'
                },
                {
                    label: 'Item',
                    value: 'item'
                }
            ]
        };

        //Category operation
        $meteor.subscribe('category', '');
        $scope.searchCate = function (searchTxt) {
            $scope.categories = $meteor.collection(function () {
                return Category.find(
                    {
                        name: {$regex: '.*' + searchTxt || '' + '.*', $options: 'i'}
                    },
                    {
                        sort: {name: 1}
                    });
            }, false);
        };
        /*Add new category if not exist
         These methods is bind on md-on-append event*/
        $scope.addCategory = function (newCategory, selectedCates) {
            /* Kiem tra newCategory da co trong database hay chua neu chua thi tao moi
             typeof newCategory ==='object' => da ton tai trong database nguoc lai
             typeof newCategory === 'string' => trong database chua co phai tao moi
             */

            /*Check newCategory is already in newProduct.category?
             if yes do nothing, else add to newProductCategory
             */

            if (typeof newCategory === 'object' && $scope.newProduct.category.indexOf(newCategory._id) < 0) {
                $scope.newProduct.category.push(newCategory._id);
                selectedCates.push(newCategory);
                //console.log($scope.newProduct.category);
                //console.log(selectedCates);
            } else if (typeof newCategory === 'string') {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Create new Category',
                    template: 'Do you want create new category?'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        //Tao document moi
                        newCategory = {
                            name: newCategory
                        };
                        //sau khi insert luu lai id, sau nay co the dung de remove or something else
                        newCategory._id = Category.insert(newCategory);

                        if (newCategory._id) {
                            $scope.newProduct.category.push(newCategory._id);
                            selectedCates.push(newCategory);
                            //console.log($scope.newProduct.category);
                            //console.log(selectedCates);
                        } else {
                            console.log('Create category error');
                        }
                    }
                })
            }
        };
        $scope.removeCateChip = function (chip) {
            console.log('before:' + $scope.newProduct.category);
            $scope.newProduct.category.splice($scope.newProduct.category.indexOf(chip._id), 1);
            console.log('after:' + $scope.newProduct.category);
        };


        //Tag operation
        $meteor.subscribe('tags', '');
        $scope.searchTags = function (searchTxt) {
            $scope.tags = $meteor.collection(function () {
                return Tag.find(
                    {
                        name: {$regex: '.*' + searchTxt || '' + '.*', $options: 'i'}
                    },
                    {
                        sort: {name: 1}
                    }
                );
            });
        };
        /*Add new tag if not exist
         These methods is bind on md-on-append event*/
        $scope.addTag = function (newTag, selectedTags) {
            /* Kiem tra newCategory da co trong database hay chua neu chua thi tao moi
             typeof newCategory ==='object' => da ton tai trong database nguoc lai
             typeof newCategory === 'string' => trong database chua co phai tao moi
             */

            /*Check newCategory is already in newProduct.category?
             if yes do nothing, else add to newProductCategory
             */

            if (typeof newTag === 'object' && $scope.newProduct.tags.indexOf(newTag._id) < 0) {
                $scope.newProduct.tags.push(newTag._id);
                selectedTags.push(newTag);
                //console.log($scope.newProduct.category);
                //console.log(selectedCates);
            } else if (typeof newTag === 'string') {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Create new Tag',
                    template: 'Do you want create new tag?'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        //Tao document moi
                        newTag = {
                            name: newTag
                        };
                        //sau khi insert luu lai id, sau nay co the dung de remove or something else
                        newTag._id = Tag.insert(newTag);

                        if (newTag._id) {
                            $scope.newProduct.tags.push(newTag._id);
                            selectedTags.push(newTag);
                            //console.log($scope.newProduct.category);
                            //console.log(selectedCates);
                        } else {
                            console.log('Create category error');
                        }
                    }
                });
            }
        };
        $scope.removeTagChip = function (chip) {
            $scope.newProduct.tags.splice($scope.newProduct.category.indexOf(chip._id), 1);
        };


        //Product operation
        //Parent boxes
        $meteor.autorun($scope, function () {
            $meteor.subscribe(
                'product_admin',
                {
                    limit: 10,
                    sort: {createdDate: -1}
                },
                $scope.getReactively('searchTxtProduct'),
                $scope.getReactively('newProduct').profile.type === 'box' ? 'item' : 'box'
            );
        });
        $scope.products = $meteor.collection(function () {
            return Product.find();
        });
        $scope.searchProduct = function (searchTxt) {
            $scope.searchTxtProduct = searchTxt;
        };
        $scope.addParentBox = function (selectedBox, selectedParentBoxes) {
            if (typeof selectedBox === 'object' && $scope.newProduct.parentBoxes.indexOf(selectedBox._id) < 0) {
                $scope.newProduct.parentBoxes.push(selectedBox._id);
                selectedParentBoxes.push(selectedBox);
            }
        };
        $scope.removeParentBox = function (box) {
            console.log($scope.newProduct.parentBoxes);
            var index = $scope.newProduct.parentBoxes.indexOf(box._id);
            $scope.newProduct.parentBoxes.splice(index, 1);
            console.log($scope.newProduct.parentBoxes);
        };

        //Child products
        $scope.addChildProduct = function (selectedItem, selectedChildProducts) {
            if (typeof selectedItem === 'object' && $scope.newProduct.childProducts.indexOf(selectedItem._id) < 0) {
                $scope.newProduct.childProducts.push(selectedItem._id);
                selectedChildProducts.push(selectedItem);
            }
        };
        $scope.removeChildProduct = function (box) {
            console.log($scope.newProduct.childProducts);
            var index = $scope.newProduct.childProducts.indexOf(box._id);
            $scope.newProduct.childProducts.splice(index, 1);
            console.log($scope.newProduct.childProducts);
        };


        //Image operation
        $meteor.subscribe('images');
        $scope.images = $meteor.collectionFS(Images, false, Images);

        //Create a modal to operate upload image, we can call as modalUploader
        $ionicModal.fromTemplateUrl('imageUploader.ng.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
    }]);