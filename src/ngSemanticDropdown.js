angular.module('ngSemanticDirectives', [])
.directive('ngDropdown', [
    function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                selected: '=',
                options: '=',
                multiple: '=',
                change: '&',
                disabled: '=',
                additions: '=',
                loading: '=',
                defaultText: '@',
                labelField: '@'

            },
            //templateUrl: 'ngDropDown.html',
            template:`
            <div class="ui dropdown selection ng-class:classes" ng-class="{'loading' : loading, 'disabled' : disabled, 'multiple' : multiple, 'active visible' : isActive }" tabindex="0" ng-focus="onFocus()" ng-blur="onBlur()">
                <i class="dropdown icon"></i>
                <div class="default text" ng-if="(!multiple && !selected) || (multiple && !selected.length)" ng-bind="defaultText"></div>
                <div class="text" ng-if="selected && !multiple" ng-bind="selected[labelField]"></div>
                <a ng-if="selected && selected.length" style="display: inline-block !important;" class="ui label transition visible" ng-repeat="item in selected">
                    {{item[labelField]}}
                    <i class="delete icon" ng-click="selected.splice($index, 1)"></i>
                </a>
                <div class="menu transition" ng-class="isActive ? 'visible menu-visible' : 'hidden'" >
                    <div class="item" ng-click="selectOption(item)" ng-repeat="item in options | filter:isUnselected" ng-bind="item[labelField]"></div>
                </div>
            </div>
            `,
            link: function (scope, elem, attrs) {
                //scope.classes = attrs.class;
                if(scope.multiple && !Array.isArray(scope.selected)){
                    scope.selected = [];
                }
                if(scope.change){
                    scope.$watch('selected', function(newVal, oldVal){
                        if((!scope.multiple && scope.selected) || (scope.multiple && !scope.selected.length)){
                            scope.change();
                        }
                        
                    })
                }
                scope.changeActive = function(){
                    scope.isActive = !scope.isActive;
                }

                scope.getLabel = function(item){
                    return item[scope.labelField];
                }
                scope.selectOption = function(item){
                    if(!scope.multiple){
                        scope.selected = item;
                        scope.isActive = false;
                    }
                    else{
                        scope.selected.push(item);
                    }
                }
                scope.onFocus = function(){
                    scope.isActive = true;
                }
                scope.onBlur = function(){
                    scope.isActive = false;
                }
                scope.isUnselected = function(item){
                    if(scope.multiple){
                        scope.isActive = scope.isActive;
                        return scope.selected.findIndex(i => i == item) === -1;
                    }
                    return true;
                }
            }
        };
    }]
);