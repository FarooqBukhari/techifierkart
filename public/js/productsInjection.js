var app = angular.module("techifierKart",[]);
app.controller('productInjection',function($scope, $http){
    $scope.getProducts = function(string){
        $http({
            url: '/product/'+ string,
            method: 'GET'
        }).then(function mySuccess(response){
            console.log(response.data);
            $scope.products = response.data;
        },function myError(response){
            $scope.products = response.statusText;
        })
    }
});