/**
 * Created by vinh on 7/10/2015.
 */
app.controller('imageUploaderCtrl', ['$scope', '$meteor', '$ionicModal', imageUploaderCtrl]);

function imageUploaderCtrl($scope, $meteor, $ionicModal) {

    //Private variable
    var ctrl = this,
        isFirstShow = true,
        isResettingCurrentPage = false;

    //Public variable
    ctrl.scope = $scope;
    ctrl.modal = '';
    ctrl.seletecIndex = 0;
    ctrl.isDelete = false;
    ctrl.prepareFilter = prepareFilter;
    ctrl.filter = 'all';
    ctrl.isSaving = false;


    //Scope variable
    $scope.recentUploadedImages = [];
    $scope.recentUploadedLocalURI = [];
    $scope.paginate = {
        total: 0,
        perPage: 10,
        currentPage: 0,
        searchImgTxt: ''
    };

    //Scope method
    $scope.addImages = addImages;
    $scope.save = save;
    $scope.loadMore = loadMore;
    $scope.moreDataCanBeLoaded = moreDataCanBeLoaded;
    $scope.selectImage = selectImage;
    $scope.$on('modal.shown', function () {
        if (isFirstShow) {
            //Load collection
            $meteor.autorun($scope, function () {
                $meteor.subscribe('images',
                    ctrl.prepareFilter($scope.getReactively('$imageUploaderCtrl.filter')),
                    {
                        limit: (parseInt($scope.getReactively('paginate.currentPage'))) * parseInt($scope.getReactively('paginate.perPage'))
                    },
                    $scope.getReactively('paginate.searchImgTxt')
                ).then(function () {
                        $scope.paginate.total = $meteor.object(Counts, 'numberOfImages', false);
                        // Sau khi load xong phai phat ra event bao ket thuc
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    })
            });
            isFirstShow = false;
        }
    });
    $scope.images = $meteor.collectionFS(Images, false, Images);
    $scope.recentUpload = $meteor.collectionFS(function () {
        return Images.find({_id: '000'})
    }, false, Images);
    $scope.deleteRecentUploaded = deleteRecentUploaded;

    /*When filter change, we don't want load more than first page(cause reduce performance)
     Solution: watch filter and set isResetCurrentPage flag = true.
     This action help loadMore method handle it's behavior, this help solve problem
     * */
    $scope.$watch('$imageUploaderCtrl.filter', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.paginate.currentPage = 1;
            isResettingCurrentPage = true;
        }
    });


    //Initiation
    init();

    //Remove modal when done with it
    $scope.$on('$destroy', onDestroy);


    function init() {
        createModal();
    }

    function createModal() {
        //Create modal instance
        $ionicModal.fromTemplateUrl('client/directive/ImageUploader/imgUploadModalTempl.ng.html', {
            scope: $scope
        }).then(function (modal) {
            ctrl.modal = modal;
        });
    }

    function onDestroy() {
        ctrl.modal.remove();
    }

    //Use currentUploaded variable to save last uploaded files
    //$scope.recentUploadedImages save all recent uploaded files
    var currentUploaded = [];

    function addImages(files, event, rejectedFile) {
        if (files.length > 0) {

            //Advance
            currentUploaded = [];
            angular.forEach(files, function (value, key) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $scope.$apply(function () {
                        $scope.recentUploadedLocalURI.push(e.target.result);
                        var newFile = new FS.File(files[key]);
                        $scope.recentUploadedImages.push(newFile);
                        currentUploaded.push(newFile);
                    });
                };
                reader.readAsDataURL(files[key]);
            });
        }
    }

    //Save last uploaded files
    //Because recentUploadedImages(this is array of FS.File) is being used in ng-repeat,
    // so angular automatic add $$hashKey to objects in this array.
    // This will cause an error: '$$hashKey must not start with $...'.
    // Thus we must be delete $$hashKey of object
    function save() {

        $meteor.subscribe('recent');
        if (currentUploaded && currentUploaded.length > 0) {
            angular.forEach(currentUploaded, function (value, key) {


                delete value.$$hashKey;
                $scope.recentUpload.save(value);
            });
        }

    }

    //Load more file when user scroll to bottom (ion-scroll-infinite directive)
    function loadMore() {
        if (!$scope.paginate.searchImgTxt && !isFirstShow && !isResettingCurrentPage) {
            $scope.paginate.currentPage += 1;
        }
        //Emit 'scroll.infiniteScrollComplete' event, notify  listeners scroll finished
        //If not, infinite scroll will pending forever
        if (isResettingCurrentPage) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
        isResettingCurrentPage = false;
    }

    //Check if collection have more object
    function moreDataCanBeLoaded() {
        return ($scope.paginate.currentPage * $scope.paginate.perPage) < $scope.paginate.total.count
    }

    //Select image if it was uploaded to server
    function selectImage(url, isUploaded, event) {
        if (isUploaded) {
            $scope.saveUrlTo = url;
            ctrl.modal.hide();
        }
    }

    //Prepare filter, filter is used in subscribe function
    function prepareFilter(option) {
        var methods = {
            all: function () {
                return {$gt: new Date('1971')};
            },
            thisYear: function () {
                var date = new Date();
                var year = date.getFullYear();
                var from = new Date(year.toString()),
                    to = new Date((parseInt(year) + 1).toString());
                to.setDate(0);
                //console.info(date, year, from, to);
                return {$gte: from, $lte: to};
            },
            thisMonth: function () {
                var date = new Date();
                var year = date.getFullYear(),
                    month = date.getMonth();
                var from = new Date(year.toString(), (month).toString()),
                    to = new Date(year.toString(), (month + 1).toString());
                to.setDate(0);
                //console.log(query);
                return {$gte: from, $lte: to};
            },
            thisDay: function () {
                var date = new Date();
                var year = date.getFullYear(),
                    month = date.getMonth(),
                    day = date.getDate();
                date = new Date(year.toString(), month.toString(), day.toString());

                //console.log(query);
                return {$gte: date};
            }
        };
        return methods[option]();
    }

    function deleteRecentUploaded(index, image) {

        $scope.recentUploadedImages.splice(index, 1);
        $scope.recentUploadedLocalURI.splice(index, 1);
        currentUploaded.splice(index, 1);

        //Remove from database too
        /*if (image && image._id) {
            $scope.recentUpload.remove(image);
        }*/
    }

}


app.directive('vtImageUploader', [function () {
    return {
        restrict: 'E',
        controller: 'imageUploaderCtrl',
        controllerAs: '$imageUploaderCtrl',
        scope: {
            saveUrlTo: '=vtSaveUrlTo'
        },
        template: '\
        <button class="button button-outline button-positive"\
            ng-click="$imageUploaderCtrl.modal.show()">\
            Choose Image\
        </button>\
        '
    };
}]);




