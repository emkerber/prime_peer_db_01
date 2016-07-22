var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
  assignment_number: String,
  student_name: String,
  score: String,
  date_completed: Date
})

var Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
