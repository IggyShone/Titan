titanApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

    $scope.ok = function () {
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});