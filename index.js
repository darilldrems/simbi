var bunyan = require('bunyan');
var bunyanLoggly = require('bunyan-loggly');
var bunyanRequest = require('bunyan-request');
var _ = require('lodash');

module.exports = function requestResponse2Loggly(options) {
  var logglyConfig = options.loggly;

  if (_.isEmpty(logglyConfig)) {
    throw new Error("You need to add your loggly configuration \
      to the options object i.e {loggly: {token: '', subdomain: ''}}");
  }

  if (_.isEmpty(logglyConfig.token)) {
    throw new Error("You need to set your loggly token");
  }

  if (_.isEmpty(logglyConfig.subdomain)) {
    throw new Error("You need to set your loggly subdomain");
  }

  var bufferLen = options.buffer_len || 5;
  var timeout = options.timeout || 500;
  var logglyTransport = new bunyanLoggly(logglyConfig, bufferLen, timeout);

  var logger = bunyan.createLogger({
    name: options.name,
    streams: [
      {
        type: 'raw',
        stream: logglyTransport
      }
    ]
  });
  //TODO: add fields not to log on req object as well as response

  var requestLogger = bunyanRequest({
    logger: logger,
    headerName:  options.headerName || "x-request-id"
  });

  return requestLogger;
}
