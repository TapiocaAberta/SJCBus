angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope, Bus) {
    })

    .controller('BusCtrl', function ($scope, Bus, $ionicLoading) {

        $scope.show = function () {
            $scope.loading = $ionicLoading.show({
                content: 'Loading',
            });
        };

        $scope.hide = function () {
            $scope.loading.hide();
        };

        var refreshBuses = function (buses) {
            $scope.buses = buses;

            if (!$scope.$$phase) {
                $scope.$digest();
            }
        }

        var initializeBuses = function () {
            $scope.show();

            var callback = Bus.all();

            callback.success(function (data) {
                Bus.buses = data;
                $scope.hide();
                refreshBuses(Bus.buses);
            });
        };

        if (!Bus.buses) {
            initializeBuses();
        }
        else {
            refreshBuses(Bus.buses);
        }
    })

    .controller('BusDetailCtrl', function ($scope, $stateParams, Bus) {
        var busId = $stateParams.busId;
        $scope.bus = Bus.get(busId);

        $scope.addToFavorites = function() {
            $scope.bus.isFavorite = true;
        };

        $scope.removeFromFavorites = function() {
            $scope.bus.isFavorite = false;
        };
    })

    .controller('AccountCtrl', function ($scope) {
    });
