/**
 * Created by vinh on 7/8/2015.
 */
app.directive('vtRemoveChipButton', function () {
    return {
        restrict: 'E',
        scope: {
            onClickHandler: '&vtOnClick'
        },
        template: '\
                  <button\
                      class="md-chip-remove"\
                      ng-if="!$mdChipsCtrl.readonly"\
                      ng-click="onClickHandler(); $mdChipsCtrl.removeChipAndFocusInput($$replacedScope.$index)"\
                      type="button"\
                      aria-hidden="true"\
                      tabindex="-1">\
                    <md-icon md-svg-icon="md-close"></md-icon>\
                    <span class="md-visually-hidden">\
                      {{$mdChipsCtrl.deleteButtonLabel}}\
                    </span>\
                  </button>'
    }
});