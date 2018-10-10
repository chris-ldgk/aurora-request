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

  this.makeRequest = async function(method, path, body) {
    request({
      method: method,
      uri: this.uri + path,
      json: body ? body : null
    }, (err, res, body) => {
      if (method === "GET") {
        return JSON.parse(res.body);
      } else if (method === "PUT") {
        return res.statusCode;
      }
    })
  }
};

AuroraRequest.prototype.getInfo = async function() {
  try {
    return await this.makeRequest("GET", "/");
  } catch(err) {
    console.log(err);
  }
};

AuroraRequest.prototype.getOnState = async function() {
  try {
    return await this.makeRequest("GET", "/state/on");
  } catch(err) {
    console.log(err);
  }
}

AuroraRequest.prototype.setOnState = async function(on) {
  try {
    return await this.makeRequest("PUT", "/state", {"on": {"value": on}});
  } catch(err) {
    console.log(err);
  }
}

AuroraRequest.prototype.toggleOnOff = async function() {
  try {
    const onState = await this.getOnState();
    return await this.setOnState(onState.value);;
  } catch(err) {
    console.log(err);
  }
}

AuroraRequest.prototype.getBrightness = async function() {
  try {
    return await this.makeRequest("GET", "/state/brightness");
  } catch(err) {
    console.log(err);
  }
}

AuroraRequest.prototype.setBrightness = async function(brightness, duration) {
  try {
    return await this.makeRequest("PUT", "/state", {"brightness": {value: brightness, duration: duration ? duration : 0}});
  } catch(err) {
    console.log(err);
  }
}

AuroraRequest.prototype.getHue = async function() {
  try {
    return await this.makeRequest("GET", "/state/hue");
  } catch(err) {
    console.log(err);
  }
}

AuroraRequest.prototype.setHue = async function(hue) {
  try {
    return await this.makeRequest("PUT", "/state", {"hue": {value: hue}});
  } catch(err) {
    console.log(err);
  }
}

AuroraRequest.prototype.getSaturation = async function() {
  try {
    return await this.makeRequest("GET", "/state/sat");
  } catch(err) {
    console.log(err);
  }
}

AuroraRequest.prototype.setSaturation = async function(sat) {
  try {
    return await this.makeRequest("PUT", "/state", {"sat": {value: sat}});
  } catch(err) {
    console.log(err);
  }
}

AuroraRequest.prototype.getColorTemp = async function() {
  try {
    return await this.makeRequest("GET", "/state/ct");
  } catch(err) {
    console.log(err);
  }
}

AuroraRequest.prototype.setColorTemp = async function(ct) {
  try {
    return await this.makeRequest("PUT", "/state", {"ct": {value: ct}});
  } catch(err) {
    console.log(err);
  }
}

AuroraRequest.prototype.getColorMode = async function() {
  try {
    return await this.makeRequest("GET", "/state/colorMode");
  } catch(err) {
    console.log(err);
  }
}

AuroraRequest.prototype.getEffects = async function() {
  try {
    return await this.makeRequest("GET", "/effects/effectsList");
  } catch(err) {
    console.log(err);
  }
}

AuroraRequest.prototype.getCurrentEffect = async function() {
  try {
    return await this.makeRequest("GET", "/effects/select");
  } catch(err) {
    console.log(err);
  }
}

AuroraRequest.prototype.setCurrentEffect = async function(effect) {
  try {
    return await this.makeRequest("PUT", "/effects", {select: effect})
  } catch(err) {
    console.log(err);
  }
}

// TODO: add more exotic requests
