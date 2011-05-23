var  fs = require('fs');
require.paths.unshift('./lib');
require.paths.unshift('./plugins');
var config; 

//Read config and boot listener
fs.readFile('./config.json', function(err,data) {
  if(err) {
    throw err;
  }

  try {
    config = JSON.parse(data.toString());
    
   //Require repo plugins 
    for (var plugs in config.repos) {
      var plug = config.repos[plugs];
      var count = plug.length;
      for(i = 0; i < count; i++) {
        console.log(config.repos[plugs][i]);
        config.repos[plugs][i] = require(config.repos[plugs][i]); 
      }
    }

    console.log(config);
    var receiver = require('receiver');
    receiver(config);
  } 
  catch(err) { 
    throw err; 
  }
});
