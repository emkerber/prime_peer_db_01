var router = require('express').Router();

//require the assignment schema from models
var Assignment = require('../models/assignments.js');


//if just a / is received, console log the assignments
router.get('/', function(request, response) {
  Assignment.find({}, function(err, assignments) {
    if(err) {
      console.log('Error getting /assignments:', err);
      response.sendStatus(500);
    } else {
      response.send(assignments);
    }
  })
});


//if a new assignment is added, read the data and assign it as such, and save
router.post('/add', function(request, response) {
  console.log('Adding assignment');
  var data = request.body;

  var addedAssignment = new Assignment({
    assignment_number: data.assignment_number,
    student_name: data.student_name,
    score: data.score,
    date_completed: new Date()
  });

  addedAssignment.save(function(err) {
    if(err) {
      console.log('Save error:', err);
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });
});

//to search by ID
router.get('/search/:id?', function(request, response) {
  var id = request.params.id;

  //if no ID is entered in the ID search box, send all of the assignments
  if(!id) {
    Assignment.find({}, function(err, assignment) {
      if(err) {
        console.log('Error searching', err);
      } else {
        response.send(assignment);
      }
    })
  } else {
    Assignment.find({'_id' : id }, function(err, assignment) {
      if(err) {
        console.log('Error finding by ID', err);
        response.sendStatus(500);
      } else {
        console.log('Success searching by ID');
        response.send(assignment);
      }
    })
  }
})

//hard mode: delete individual assignments 
router.get('/delete/:id', function(request, response) {
  var id = request.params.id;

  Assignment.findByIdAndRemove({ '_id' : id }, function(err, assignment) {
    if(err) {
      console.log('Error finding by ID and removing:', err);
      response.sendStatus(500);
    } else {
      console.log('Success finding by ID and removing', assignment);
    }
  })
})

module.exports = router;
