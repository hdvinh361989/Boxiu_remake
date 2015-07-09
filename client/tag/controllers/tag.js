/**
 * Created by vinh on 6/25/2015.
 */
app.controller('tagCtrl', ['$scope', '$meteor', function ($scope, $meteor) {
    //initial
    $meteor.subscribe('tag');
    $scope.searchTxt = '';
    $scope.newTag = {};
    $scope.search = search;
    $scope.save = save;
    $scope.reset = reset;
    $scope.tags = $meteor.collection(function () {
        return Tag.find({}, {sort: {name: 1}});
    });
    $scope.selectedTags = [];
    $scope.toggle = toggle;
    $scope.delete = deleteTags;

    //init table
    $scope.table = {};

    $scope.table.columns = [
        {
            name: 'name',
            displayName: false,
            width: 30
        },
        {
            name: 'description',
            displayName: true,
            width: 55,
            class: 'shortDescription'
        }
    ];

    function search(query) {
        if (query) {
            query = query.trim();
            myPattern = '.*' + query + '.*';
            return $meteor.collection(function () {
                return Tag.find({
                    name: {
                        $regex: myPattern,
                        $options: 'i'
                    }
                });
            })
        }
    }

    function save(tag) {
        if (tag._id) {
            tag.save();
        } else {
            //Insert operation
            Tag.insert(tag, function (err, id) {
                if (err) {
                    console.log('Insert error: ', err);
                    return;
                }
                $scope.newTag = $meteor.object(Tag, id, false);
                $scope.newTag = {};
            })
        }
    }

    function reset() {
        if ($scope.newTag._id) {
            $scope.newTag.reset();
            return;
        }
        $scope.newTag = {};
    }

    function toggle(tag, list) {
        var idx = list.indexOf(tag);
        if (idx > -1) {
            list.splice(idx, 1);
            // kiem tra neu list da empty thi reset newTag
            if (list.length === 0) {
                $scope.newTag = {};
                return;
            }
            $scope.newTag = $meteor.object(Tag, list[list.length - 1]._id, false);
        } else {
            list.push(tag);
            $scope.newTag = $meteor.object(Tag, tag._id, false);
        }
    }

    function deleteTags(list) {
        $scope.tags.remove(list);

        //reset list
        list = [];
    }
}]);