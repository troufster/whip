var sys = require('sys');
var spawn = require('child_process').spawn;

module.exports = function(payload, params) {
  
 var clone = spawn('python', params); 

 clone.stdout.on('data', function(data) {
  console.log('stdout: ' + data);
 });

 clone.stderr.on('data', function(data) {
  console.log('stderr:' + data);
 });
};
