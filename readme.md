# Simbi
Simbi is an express middleware for sending request object and response objects to loggly.

## Installatin
```
npm install simbi
```

## Usage
```
var simbi = require('simbi');
var express = require('express');

var app = express();
var options = {
  name: "myapp",
  loggly: {
    token: "",
    subdomain: ""
  }
};

app.use(simbi(options));
```
