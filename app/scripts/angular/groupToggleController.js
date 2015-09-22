'use strict';
app
    .controller('groupToggleCtrl', function($scope) {
        $scope.isToggled = false;
        /**
         * Emit the event which is on listening to move group position
         * @param isDesc
         * @param index
         */
        $scope.moveDesc = function(isDesc, index) {
            $scope.$emit('move-group-desc', {
                isDesc: isDesc,
                index: index
            });
        };
    });