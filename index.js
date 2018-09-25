const request = require("request");

var AuroraRequest = module.exports = function(opts) {
  var self = this;

  if (!opts) {
    throw new Error("Please specify options");
  }

  if (!opts.host) {
    throw new Error('Missing \'host\' option');
  }

  if (!opts.port) {
    throw new Error('Missing \'port\' option');
  }

  if (!opts.token) {
    throw new Error('Missing \'token\' option');
  }

  this.host = opts.host;
  this.port = opts.port;
  this.token = opts.token;
  this.uri = "http://" + opts.host + ":" + opts.port + "/api/v1/" + opts.token;

  this.makeRequest = function(method, path, body) {
    return new Promise((resolve, reject) => {
      request({
        method: method,
        uri: this.uri + path,
        json: body ? body : null
      }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      })
    })
  }
};

AuroraRequest.prototype.getInfo = function() {
  return this.makeRequest("GET", "/");
};

AuroraRequest.prototype.turnOn = function() {
  return this.makeRequest("PUT", "/state", {"on": {"value": true}});
}

AuroraRequest.prototype.turnOff = function() {
  return this.makeRequest("PUT", "/state", {"on": {"value": false}});
}

// TODO: add toggle function and more requests
