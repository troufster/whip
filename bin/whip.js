var  fs = require('fs');
require.paths.unshift('./lib');
var config; 

//Read config and boot listener
fs.readFile('./config.json', function(err,data) {
  if(err) {
    throw err;
  }

  try {
    config = JSON.parse(data.toString());
    console.log(require.paths);
    var receiver = require('receiver');
    receiver(config);
  } catch(err) { throw err; }
});
