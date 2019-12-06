var app = angular.module("techifierKart",[]);
app.controller('autocomplete',function($scope, $http){
    $scope.complete = function(string){
        var title = $('#searchProds').val();
        $http({
            url: '/search/'+ title,
            method: 'GET'
        }).then(function mySuccess(response){
            $scope.products_list = response.data;
            $scope.hideinfo = false;
            var output = [];
            angular.forEach($scope.products_list, function(product){
                output.push(product);
            });
        $scope.search_product = output;
        },function myError(response){
            $scope.products_list = response.statusText;
        })
    }
    $scope.choose_textbox = function(string){
        $scope.searchProds = string;
        $scope.hideinfo = true;
    }
});
app.controller('productInjection',function($scope, $http){
    $scope.getProducts = function(string){
        $http({
            url: '/product/'+ string,
            method: 'GET'
        }).then(function mySuccess(response){
            console.log(response);
            $scope.products = response.data;
        },function myError(response){
            $scope.products = response.statusText;
        })
    }
});