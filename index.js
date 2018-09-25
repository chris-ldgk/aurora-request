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
      }, (err, res, body) => {
        if (err) {
          reject(err);
        }
        if (method === "GET") {
          resolve(res.body);
        } else if (method === "PUT") {
          resolve(res.statusCode);
        } else if (method === "POST") {
          // TODO: what the fuck does a post return?
        }
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

AuroraRequest.prototype.getOnState = function() {
  return this.makeRequest("GET", "/state/on");
}

AuroraRequest.prototype.toggleOnOff = function() {
  return new Promise((resolve, reject) => {
    this.getOnState()
      .catch(err => {
        reject(err);
      })
      .then(res => {
        let state = JSON.parse(res).value;
        state
          ? this.turnOff().catch(err => {reject(err)}).then(res => {resolve(res)})
          : this.turnOn().catch(err => {reject(err)}).then(res => {resolve(res)})
      })
  })
}

AuroraRequest
