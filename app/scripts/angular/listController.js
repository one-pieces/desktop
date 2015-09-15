'use strict';

app
    .controller('listCtrl', function($scope) {
        $scope.lists = [];
        $.get('/api/beneficiarytables', function(res, status, xhr) {
        	console.log(res.beneficiarytables);
        	$scope.lists = res.beneficiarytables;
        });

        $scope.deleteTable = function(id, index) {
          $.ajax({
              url: '/api/beneficiarytable/' + id,
              type: 'delete',
              success: function(req) {
              	$scope.lists.splice(index, 1);
              }
          });
              	$scope.lists.splice(index, 1);
        };
    });