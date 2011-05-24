var util = require('util');
var fs = require('fs');


function Logger(config) {
  if(!config.log) throw 'I dont know where to log!';
 
 var remote = config.log.indexOf('inputs') != -1;
  this.log = null;

  if(remote) {
    this.log = new LogglyLogger(config.log);
  }
  else { 
    this.log = fs.createWriteStream(config.log, { flags : 'a' });
  }
};

Logger.prototype.write = function(str) {
  this.log.write(str + '\n');
};


function LogglyLogger(url) {
  this.url = url;
  this.client = {
    host : 'logs.loggly.com',
    port : 443,
    path : url,
    method : 'POST'  
  };
  
}

LogglyLogger.prototype.write = function(str) {
  var request = require('https').request(this.client, function() {});
  request.write(str);
  request.end();
}

module.exports = Logger;
