angular.module('starter.controllers', [])

/***************************************************************
 * Initial screen
 ***************************************************************/
    .controller('DashCtrl', function ($scope, Bus) {
        $scope.favorites = Bus.favorites;

        var initializeNextTravells = function () {
            for (bus in $scope.favorites) {
                var bus = $scope.favorites[bus];
                calculateNextTravell(bus);
            }
        };

        var initializeNextTimes = function () {
            for (bus in $scope.favorites) {
                var bus = $scope.favorites[bus];
                calculateNextTimes(bus);
            }
        };

        var calculateNextTravell = function (bus) {
            var times = getTimesByTheDayOfTheWeek(bus);
            var timestamp = getTimeStamp();
            var nextTime;

            for (var i = 0; i < times.length; i++) {
                if (times[i] >= timestamp) {
                    nextTime = times[i];
                    break;
                }
            }
            ;

            if (nextTime) {
                var nextTimeDate = new Date();
                var subHours = nextTime.substring(0, 2);
                var subMinutes = nextTime.substring(3, 5);

                nextTimeDate.setHours(subHours);
                nextTimeDate.setMinutes(subMinutes);

                var timeRemaining = getTimeDifference(new Date(), nextTimeDate);

                bus.proxima_partida = timeRemaining;
            }
        };

        var calculateNextTimes = function (bus) {
            var times = getTimesByTheDayOfTheWeek(bus);
            var nextFiveTimes = getNextFiveTimes(times);
            bus.proximos_horarios = nextFiveTimes;
        };

        var getTimesByTheDayOfTheWeek = function (bus) {
            var dayOfTheWeek = getDayOfTheWeek();
            var times;

            if (dayOfTheWeek == "sat") {
                times = bus.horarios.aosSabados;
            }
            else if (dayOfTheWeek == "sun") {
                times = bus.horarios.domingosEFeriado;
            }
            else {
                times = bus.horarios.deSegundaSexta;
            }

            return times;
        };

        /**
         get the timestamp from now on the format HH:MM
         */
        var getTimeStamp = function () {
            var today = new Date();
            var hoursFromNow = ("0" + today.getHours()).slice(-2);
            var minutesFromNow = ("0" + today.getMinutes()).slice(-2);
            var timestamp = hoursFromNow + ":" + minutesFromNow;
            return timestamp;
        };

        var getNextFiveTimes = function (times) {
            var nextFiveTimes = [];
            var timestamp = getTimeStamp();

            for (var i = 0; i < times.length; i++) {
                if (times[i] >= timestamp) {
                    nextFiveTimes.push(times[i]);

                    if (nextFiveTimes.length == 5) {
                        break;
                    }
                }
            }
            ;

            return nextFiveTimes;
        };

        /**
         The getDay() method returns the day of the week (from 0 to 6) for the specified date.
         Note: Sunday is 0, Monday is 1, and so on.
         **/
        var getDayOfTheWeek = function () {
            var today = new Date();
            var dayOfTheWeek = today.getDay();
            var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
            return days[dayOfTheWeek];
        };

        /**
         get the difference between two dates.
         **/
        var getTimeDifference = function (earlierDate, laterDate) {
            var oDiff = new Object();

            //  Calculate Differences
            //  -------------------------------------------------------------------  //
            var nTotalDiff = laterDate.getTime() - earlierDate.getTime();

            oDiff.days = Math.floor(nTotalDiff / 1000 / 60 / 60 / 24);
            nTotalDiff -= oDiff.days * 1000 * 60 * 60 * 24;

            oDiff.hours = Math.floor(nTotalDiff / 1000 / 60 / 60);
            nTotalDiff -= oDiff.hours * 1000 * 60 * 60;

            oDiff.minutes = Math.floor(nTotalDiff / 1000 / 60);
            nTotalDiff -= oDiff.minutes * 1000 * 60;

            oDiff.seconds = Math.floor(nTotalDiff / 1000);
            //  -------------------------------------------------------------------  //

            //  Format Duration
            //  -------------------------------------------------------------------  //
            var sDuration = ("0" + oDiff.hours).slice(-2) + "h " +
                ("0" + oDiff.minutes).slice(-2) + "m " +
                ("0" + oDiff.seconds).slice(-2) + "s ";

            oDiff.duration = sDuration;
            //  -------------------------------------------------------------------  //

            return oDiff.duration;
        }

        initializeNextTravells(); // bus.proximos_horarios
        initializeNextTimes(); //bus.proxima_partida
    })

/***************************************************************
 * Bus tab controller
 ***************************************************************/
    .controller('BusCtrl', function ($scope, Bus, $ionicLoading) {

        $scope.show = function () {
            $scope.loading = $ionicLoading.show({
                content: 'Carregando...'
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

/***************************************************************
 * Bus Detail
 ***************************************************************/
    .controller('BusDetailCtrl', function ($scope, $stateParams, Bus) {
        $scope.favorites = Bus.favorites;

        var busId = $stateParams.busId;
        $scope.bus = Bus.get(busId);

        $scope.addToFavorites = function () {
            $scope.bus.isFavorite = true;
            $scope.favorites.push($scope.bus);
        };

        $scope.removeFromFavorites = function () {
            $scope.bus.isFavorite = false;

            var index = $scope.favorites.indexOf($scope.bus);

            if (index > -1) {
                array.splice(index, 1);
            }
        };
    })

/***************************************************************
 * Configs controller
 ***************************************************************/
    .controller('AccountCtrl', function ($scope) {
    });
