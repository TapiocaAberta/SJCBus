angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('BusCtrl', function ($scope, Bus, $ionicLoading) {
        $scope.show = function() {
            $scope.loading = $ionicLoading.show({
                content: 'Loading',
            });
        };
        $scope.hide = function(){
            $scope.loading.hide();
        };

        $scope.show();

        var callback = Bus.all();

        callback.success(function (data) {
            $scope.buses = data;
            $scope.hide();
            $scope.$apply();
        });
    })

    .controller('BusDetailCtrl', function ($scope, $stateParams, Bus) {
        var busId = $stateParams.busId;
        var callback = Bus.all();

        callback.success(function (data) {
            $scope.bus = Bus.get(busId, data);
        });
    })

    .controller('AccountCtrl', function ($scope) {
    });
