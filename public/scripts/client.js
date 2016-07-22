angular.module('assignmentApp', []);

angular.module('assignmentApp').controller('AssignmentController', function($http) {
  var vm = this;

  vm.submit = function() {
    console.log('Click: submit');

    var sendData = {};

    sendData.assignment_number = vm.assignment_number;
    sendData.student_name = vm.student_name;
    sendData.score = vm.score;

    $http.post('assignment/add', sendData).then(function(response) {
      console.log(response);
    }, function(response) {
      console.log('Failure posting');
    })
  };

  var get = function() {

    function handleSuccess(response) {
      console.log('Success getting assignments:', response);
      vm.results = response.data;
    }

    function handleFailure(response) {
      console.log('Failure getting assignments:', response);
    }

    $http.get('/assignment').then(handleSuccess, handleFailure);
  }

  get();

  vm.get = get;

  vm.searchId = function() {

    console.log('Click');
    function handleSuccess(response) {
      console.log('Successful search:', response);
      vm.results = response.data;
    }

    function handleFailure(response) {
      console.log('Failure getting seach results:', response);
    }

    $http.get('/assignment/search/' + vm.search).then(handleSuccess, handleFailure);
  }

});
