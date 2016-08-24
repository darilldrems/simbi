var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var express = require('express');
var simbi = require('../index');

var app = express();



describe("simbi", function () {
  it("simbi should throw error without loggly object", function () {
    var options = { name: "testapp" };

    function test() {
      app.use(simbi(options));
    }

    expect(test).to.throw("You need to add your loggly configuration \
      to the options object i.e {loggly: {token: '', subdomain: ''}}");
  });

  it("should throw error without token", function () {
    var options = { name: "testapp", loggly: { token: "", subdomain: "" } };

    function test() {
      app.use(simbi(options));
    }

    expect(test).to.throw("You need to set your loggly token");
  });

  it("should throw error without subdomain", function () {
    var options = { name: "testapp", loggly: { token: "fgf74jhdh", subdomain: "" } };

    function test() {
      app.use(simbi(options));
    }

    expect(test).to.throw("You need to set your loggly subdomain");
  });

  it("should work with all details set", function (done) {
    var options = { name: "testapp", loggly:
      { token: "3456b3f3-d569-4b6e-996d-f16a60575271", subdomain: "ridwan" } };
    app.use(simbi(options));
    app.get("/", function (req, res, next) {
      res.json({msg: "welcome"});
    });
    request(app)
      .get("/")
      .expect(function (res) {
        expect(res.body).to.have.property("msg");
      })
      .expect(200, done);
  });
});
