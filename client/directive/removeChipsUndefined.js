/**
 * Created by vinh on 7/8/2015.
 */
/*Angular material tu dong them vao array selectedCates 1 phan tu 'undefined'
 nen  phai loai no ra */
app.directive('vtRemoveChipsUndefined', function () {
    return {
        link: function (scope, element, attrs) {
            scope.$watchCollection(attrs.ngModel, function (newValue, oldValue) {
                if (newValue.length > 0 && newValue.indexOf(undefined) > -1) {
                    scope[attrs.ngModel].pop();
                }
            })
        }
    }
});