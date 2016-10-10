[![Build Status](https://travis-ci.org/darilldrems/simbi.svg?branch=dev)](https://travis-ci.org/darilldrems/simbi)

# Simbi
Simbi is an express middleware for sending request object and response objects to loggly.

## Features
- Simbi can be used outside of the request handler function
- Simbi middleware can help automatically send request and response object to loggly

## Installatin
```
npm install simbi --save
```

## Usage
```
var Simbi = require('simbi');
var express = require('express');

var app = express();
var options = {
  name: "myapp",
  loggly: {
    token: "",
    subdomain: ""
  }
};
var simbi = Simbi(options)
app.use(simbi.middleware());
```
