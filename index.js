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

  this.makeRequest = function(method, path) {
    if (!method) {
      method = "GET"
    }

    return new Promise((resolve, reject) => {
      request({
        method: method,
        uri: "http://" + opts.host + ":" + opts.port + "/api/v1/" + opts.token + path
      }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.body);
      })
    })
  }
};

AuroraRequest.prototype.getInfo = function() {
  return this.makeRequest("GET", "/")
};

// TODO: write put requests and stuff
