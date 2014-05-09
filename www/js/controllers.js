angular.module('starter.controllers', [])

/***************************************************************
 * Initial screen
 ***************************************************************/
    .controller('DashCtrl', function ($scope, Bus) {

        //$scope.favorites = Bus.getFavoites();
        $scope.favorites = [
            {
                "numero": "10",
                "nome": "AGUAS DE CANINDU / AV. ENG. FRANCISCO JOSE LONGO (CIRCULAR NO CENTRO) O.S.O. 14",
                "sentido": "AGUAS DE CANINDU / AV. ENG. FRANCISCO JOSE LONGO",
                "itinerario": "AV. B DO AGUAS DE CANINDU (ATE O BAR SAO JORGE) – ESTR. PRINCIPAL – PRACA STA. IFIGENIA – RUA MARIA CANDIDA DELGADO – PRACA SAO MARCOS – RUA JOSE SILVERIO DE SOUZA – RODOVIA SP-50 – RUA AUDEMO VENEZIANI – PONTE MINAS GERAIS – RUA CAP. ELISIARIO – AV. RUI BARBOSA – RUA ANA EUFRASIA – AV. SAO JOSE – AV. MADRE THEREZA – RUA LUIZ JACINTO – PRACA ROTARY – RUA EUCLIDES MIRAGAIA – PRACA DR. MANOEL DE ABREU – AV. ADHEMAR DE BARROS – AV. HEITOR VILLA LOBOS – AV. ENG. FRANCISCO JOSE LONGO",
                "horarios": {
                    "deSegundaSexta": ["06:00", "13:30", "18:00", "06:30", "14:30", "18:30", "07:00", "15:00", "07:30", "15:30", "08:00", "16:00", "08:30", "16:30", "09:00", "17:00", "09:30", "17:30", "10:00", "11:00"],
                    "aosSabados": ["06:10", "15:10", "18:10", "07:10", "16:10", "08:10", "17:10", "09:10", "10:10", "11:10"],
                    "domingosEFeriado": null,
                    "observacao": ""
                },
                "id": "401e041e21e2af8d305ad9016e12add6",
                "isFavorite": false
            },
            {
                "numero": "10",
                "nome": "AGUAS DE CANINDU / AV. ENG. FRANCISCO JOSE LONGO (CIRCULAR NO CENTRO) O.S.O. 14",
                "sentido": "AV. ENG. FRANCISCO JOSE LONGO / AGUAS DE CANINDU",
                "itinerario": "AV. ENG. FRANCISCO JOSE LONGO – AV. DR. JOAO GUILHERMINO – RUA FRANCISCO RAFAEL – RUA SIQUEIRA CAMPOS – PRACA PADRE JOAO – AV. TENENTE NEVIO BARACHO – VD. TENENTE JOAO ALVES CARDOSO – AV. OLIVO GOMES – AV. PRINCESA ISABEL – RUA MANOEL RODRIGUES DE MORAES – PONTE MINAS GERAIS – RUA AUDEMO VENEZIANI – RODOVIA SP-50 – RUA JOSE SILVERIO DE SOUZA – PRACA SAO MARCOS – RUA MARIA CANDIDA DELGADO – PRACA STA. EFIGENIA – ESTR. PRINCIPAL – AV. B DO AGUAS DE CANINDU (ATE O BAR SAO JORGE)",
                "horarios": {
                    "deSegundaSexta": ["06:28", "13:58", "18:28", "06:58", "14:58", "18:58", "07:28", "15:28", "07:58", "15:58", "08:28", "16:28", "08:58", "16:58", "09:28", "17:28", "09:58", "17:58", "10:28", "11:28"],
                    "aosSabados": ["06:38", "15:38", "18:38", "07:38", "16:38", "08:38", "17:38", "09:38", "10:38", "11:38"],
                    "domingosEFeriado": null,
                    "observacao": ""
                },
                "id": "49d2be612ba5c9750b170af498e55886",
                "isFavorite": false
            }
        ];


        var initializeNextTravells = function() {
            for (bus in $scope.favorites) {
                var bus = $scope.favorites[bus];
                calculateNextTravell(bus);
            }
        };

        var initializeNextTimes = function() {
            for (bus in $scope.favorites) {
                var bus = $scope.favorites[bus];
                calculateNextTimes(bus);
            }
        };

        var calculateNextTravell = function (bus) {
                bus.proxima_partida = "10 minutos";
               //TODO: calcular quantos minutos faltam para a próxima viagem.        
        };

        var calculateNextTimes = function (bus) {
                var times = getTimesByTheDayOfTheWeek();
                var nextFiveTimes = getNextFiveTimes(times);

                //bus.proximos_horarios = ["14:00", "14:10", "14:20", "14:30", "14:40"];
                bus.proximos_horarios = nextFiveTimes();
        };

        var getTimesByTheDayOfTheWeek = function()
        {
            var dayOfTheWeek = getDayOfTheWeek();
            var times;

            if(dayOfTheWeek == "sat") 
            {
                times = bus.horarios.aosSabados;
            } 
            else if(dayOfTheWeek == "sun") 
            {
                times = bus.horarios.domingosEFeriado;
            }
            else 
            {
                times = bus.horarios.deSegundaSexta;    
            }

            return times;
        };

        /**
            get the timestamp from now on the format HH:MM  
        */
        var getTimeStamp = function(){
            var today = new Date();
            var hoursFromNow = ("0" + today.getHours()).slice(-2);
            var minutesFromNow = ("0" + today.getMinutes()).slice(-2);
            var timestamp = hoursFromNow + ":" + minutesFromNow;
            return timestamp;
        };

        var getNextFiveTimes = function(times) {

            var nextFiveTimes = [];

            times = ["14:10", "14:20", "14:30", "14:50", "14:50", "15:10", "15:20", "15:30", "15:40", "15:50"];
            
            for (var i = 0; i < times.length; i++) 
            {
                console.log(times[i], timestamp)

                if(times[i] >= timestamp)
                {
                    nextFiveTimes.push(times[i]);                        

                    if(nextFiveTimes.length == 5)
                    {
                        break;
                    }
                }
            };

            return nextFiveTimes;
        };

        /**
            The getDay() method returns the day of the week (from 0 to 6) for the specified date.
            Note: Sunday is 0, Monday is 1, and so on.
        **/
        var getDayOfTheWeek = function() {
            var today = new Date();
            var dayOfTheWeek = today.getDay();
            var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
            return days[dayOfTheWeek];
        };


        /**
            get the difference between two dates.
        **/
        var getTimeDifference = function(earlierDate, laterDate) 
        {
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
            //  Format Hours
            var hourtext = '00';
            if (oDiff.days > 0){ hourtext = String(oDiff.days);}
            if (hourtext.length == 1){hourtext = '0' + hourtext};

            //  Format Minutes
            var mintext = '00';
            if (oDiff.minutes > 0){ mintext = String(oDiff.minutes);}
            if (mintext.length == 1) { mintext = '0' + mintext };

            //  Format Seconds
            var sectext = '00';
            if (oDiff.seconds > 0) { sectext = String(oDiff.seconds); }
            if (sectext.length == 1) { sectext = '0' + sectext };

            //  Set Duration
            var sDuration = hourtext + 'h ' + mintext + 'm ' + sectext + 's';
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
        var busId = $stateParams.busId;
        $scope.bus = Bus.get(busId);

        $scope.addToFavorites = function () {
            $scope.bus.isFavorite = true;
        };

        $scope.removeFromFavorites = function () {
            $scope.bus.isFavorite = false;
        };
    })

/***************************************************************
 * Configs controller
 ***************************************************************/
    .controller('AccountCtrl', function ($scope) {
    });
