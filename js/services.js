angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
    .factory('Bus', function ($http) {

        return {
            favorites: [

            ],

            all: function () {
                return $http.get('assets/bus.json');
            },
            get: function (busId) {
                var i = 0;
                var len = this.buses.length;
                var bus = null;

                for (; i < len; i++) {
                    if (this.buses[i].id == busId) {
                        bus = this.buses[i];
                        break;
                    }
                }

                return bus;
            }
        }
    });
