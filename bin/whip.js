
require.paths.unshift('./lib');
require.paths.unshift('./plugins');

var fs = require('fs');
var receiver = require('receiver');
var Logger = require('logger');
var config; 

//Read config and boot listener
fs.readFile('./config.json', function(err,data) {
  if(err) {
    throw err;
  }

  try {
    config = JSON.parse(data.toString());
    
    config.logger = new Logger(config); 

    config.logger.write("Whip starting...");

    receiver(config);
  } 
  catch(err) { 
    throw err; 
  }
});
