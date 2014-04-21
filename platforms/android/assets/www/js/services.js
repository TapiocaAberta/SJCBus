angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
    .factory('Bus', function ($http) {
        // Might use a resource here that returns a JSON array

        return {
            all: function () {
                return $http.get('assets/bus.json');
            },
            get: function (busId, buses) {
                var i = 0;
                var len = buses.length;
                var bus = null;

                for (; i < len; i++) {
                    if (buses[i].id == busId) {
                        bus = buses[i];
                        break;
                    }
                }

                return bus;
            }
        }
    });
