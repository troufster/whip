var http = require('http');
 
module.exports = function(config) {
  if(!config || !config.user || !config.password ||
       !config.port || !config.path) {
      
    throw 'Could not start service due to missing configuration elements';
  }
 
  http.createServer(function (req, res) { 
    console.log(req);
  }).listen(config.port);
 
};
