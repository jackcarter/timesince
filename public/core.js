var scotchTodo = angular.module('timesince', ['relativeDate']);

function mainController($scope, $http) {
	$scope.formData = {};
	$scope.dateString = '2013-09-08';
    $scope.dateObject = new Date();

	// when landing on the page, get all todos and show them
	$http.get('/api/todos')
		.success(function(data) {
			console.log(data);
			$scope.todos = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	$scope.updateTodo = function(id) {
		$http.post('api/todos/update/' + id, {date : Date.now()})
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.editTodo = function(id) {
		$http.post('api/todos/update/' + id, {date : Date.now()})
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}