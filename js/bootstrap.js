define(["exports", "./app", "./config"], function (exports, _app, _config) {
  "use strict";

  var app = _app["default"];
  var config = _config["default"];


  var container = document.getElementById("container");

  app(config, container);
});