//controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    $scope.city = cityService.city;
    
    $scope.$watch('city', function(){
       cityService.city = $scope.city; 
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=58615cae401a5a19151781ee8694239a", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});
     
    $scope.convertToFaherenheit = function(degK){
        
        return Math.round((1.8 * (degK -273)) + 32);
    }
    
    $scope.convertToDate = function(dt){
        
        return new Date(dt * 1000);
    }
}]);