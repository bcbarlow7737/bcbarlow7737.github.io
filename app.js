var app = angular.module('app', ['ngSemanticDirectives']);

    app.controller('mainController', function mainController($scope){
        $scope.vm = {
            selectedOption: null,
            disableDD: false,
            arrayLoading: false,
            multiSelectedOption: null, 
            multiDisableDD: false,
            multiArrayLoading: false
        }
        $scope.phones = [
            {
                id: 1,
                name: 'Nexus S',
                snippet: 'Fast just got faster with Nexus S.'
            }, {
                id: 2,
                name: 'Motorola XOOM™ with Wi-Fi',
                snippet: 'The Next, Next Generation tablet.'
            }, {
                id: 3,
                name: 'MOTOROLA XOOM™',
                snippet: 'The Next, Next Generation tablet.'
            }
        ];
        $scope.ddChanged = function(){
            console.info('ng-dropdown changed values');
        }
        $scope.toggle = function(val){
            switch (val) {
                case 'single_disable':
                    $scope.vm.disableDD = !$scope.vm.disableDD;
                    break;
                case 'single_loading':
                    $scope.vm.arrayLoading = !$scope.vm.arrayLoading;
                    break;
                case 'multi_disable':
                    $scope.vm.multiDisableDD = !$scope.vm.multiDisableDD;
                    break;
                case 'multi_loading':
                    $scope.vm.multiArrayLoading = !$scope.vm.multiArrayLoading;
                    break;
                default:
                    break;
            }
        }
        });