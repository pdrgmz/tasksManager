
var app = angular.module('myApp', []);

app.controller('all', function($scope, $http) {

	$scope.load = function(){
		$http.get("/api/tasks").then(function (response) {
			$scope.tasks = response.data;
		});
	};	

	$scope.delete = function(iden) {  	
		var url = '/api/tasks/'+iden;  	
		data = "";
		$http.delete(url, data);
		$scope.load();
	};

	$scope.checkBox = function(iden, title, isDone) {
		var url = '/api/task/'+iden;
		var data = {
			"title" : title,
			"isDone" : isDone
			};
		$http.put(url, data);
	};

	$scope.submit = function (){
		var url = '/api/tasks';
		var data = {
			"title" : $scope.taskTitle,
			"isDone" : false
			};
		$http.post(url, data);
		$scope.taskTitle = "";
		$scope.load();
	};

	$scope.load();

});

