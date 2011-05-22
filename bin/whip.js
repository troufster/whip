var  fs = require('fs');

var config; 

//Read config and boot listener
fs.readFile('../config.json', function(err,data) {
  if(err) {
    throw err;
  }

  try {
    config = JSON.parse(data.toString());
  } catch(err) { throw 'Malformed config file :' + err }
});
