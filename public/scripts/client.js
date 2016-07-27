angular.module('assignmentApp', []);

angular.module('assignmentApp').controller('AssignmentController', function($http) {
  var vm = this;


  vm.submit = function() {
    console.log('Click: submit');

    var sendData = {};

    //reads the user input on the page and assigns it to an object
    sendData.assignment_number = vm.assignment_number;
    sendData.student_name = vm.student_name;
    sendData.score = vm.score;

    $http.post('assignment/add', sendData).then(function(response) {
      console.log(response);
    }, function(response) {
      console.log('Failure posting');
    })
  };

  //to display all of the saved assignments
  var get = function() {

    function handleSuccess(response) {
      console.log('Success getting assignments:', response);
      vm.results = response.data; //display the assignments
    }

    function handleFailure(response) {
      console.log('Failure getting assignments:', response);
    }

    $http.get('/assignment').then(handleSuccess, handleFailure);
  }

  //calls the above function, so results are displayed when the page loads
  get();

  //assigns ng-click="get()" to this function, but does not invoke it
  vm.get = get;

  //clicking "Search" invokes this function
  vm.searchId = function() {

    console.log('Click');
    function handleSuccess(response) {
      console.log('Successful search:', response);
      vm.results = response.data; //limits the results displayed to only the search results
    }

    function handleFailure(response) {
      console.log('Failure getting seach results:', response);
    }

    //concatenates the search input onto the route
    $http.get('/assignment/search/' + vm.search).then(handleSuccess, handleFailure);
  }

  vm.delete = function(id) {

    console.log('Clicked delete button on ID:', id);

    function handleSuccess(response) {
      console.log('Success removing assignment', response);
      id = response.data;
      get;
    }

    function handleFailure(response) {
      console.log('Failure removing assignment', response);
    }

    $http.get('assignment/delete/' + id).then(handleSuccess, handleFailure);
  }

});
