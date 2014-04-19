angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('BusCtrl', function ($scope, Bus) {
        var buses = Bus.all();
        $scope.buses = buses;
    })

    .controller('BusDetailCtrl', function ($scope, $stateParams, Bus) {
        var busId = $stateParams.busId;
        $scope.bus = Bus.get(busId);
    })

    .controller('AccountCtrl', function ($scope) {
    });
