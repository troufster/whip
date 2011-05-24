var http = require('http');
var sys = require('sys');
var url = require('url');

module.exports = function(config) {
  if(!config || !config.user || !config.password ||
       !config.port || !config.path) {
      
    throw 'Could not start service due to missing configuration elements';
  }
  var log = config.logger;
  
  http.createServer(function (req, res) { 
    var path = new RegExp('/' + config.path , 'g'),
        match = path.exec(req.url);
    
    //End if configured path does not match
    if(match == null || req.method != 'POST') {
      res.statusCode = 404;
      res.end();
      log.write('Access on unknown path or bad HTTP verb');
    }
    
    //Math requests auth header with config credentials
    var header = req.headers['authorization'] || '';
    var token = header.split(/\s+/).pop() || '';
    var auth = new Buffer(token, 'base64').toString();
    var parts = auth.split(/:/);


    var usermatch = parts[0]  == config.user;
    var pwdmatch = parts[1]  == config.password;

    if(!usermatch || !pwdmatch) {
      res.statusCode = 403;
      res.end();
      log.write('Unauthorized access');
    }

    fullUrl = url.parse(req.url, true);
    var formdata ='';
    
    req.on('data', function(chunk) {
      formdata += chunk.toString();
    });
    
    req.on('end', function() {
      res.writeHead(200, "OK", { 'Content-Type' : 'text/html'});
      res.end();

      try {
        
        var data = formdata.split('&');
        var payload;
        for (var key in data) {
          var arg = data[key];
          var splitarg = arg.split('=');
            
          if(splitarg[0] == 'payload') {
            //Got github datao
            log.write('Received GitHub payload');

            var raw = require('querystring').parse(arg);

            payload = JSON.parse(raw.payload);
            break;
          }
        }

        //Check if there is a handler configured for the repo in the payload
        if(payload.repository.url in config.repos) { 
          log.write('Matched repo :' + payload.repository.url);

          //Call each plugin with payload as argument
         var plugins =  config.repos[payload.repository.url].plugins;

         for (var p in plugins) {
          if(plugins.hasOwnProperty(p)) {
            var plugin = plugins[p];
            log.write('Calling plugin ' + p);
            require(p)(payload, plugin, config);
          }
         }
        }
      } catch (err) {
        log.write('Error in parsing GitHub data' + err);
      }

    });

  }).listen(config.port);
 
};
