"use strict";

var userRoles = require('../client/js/routingConfig').userRoles;

module.exports = function (app) {
  app.get("/*", function (req, res) {
    var role = userRoles.public, username = '';
    if (req.user) {
      role = req.user.role;
      username = req.user.username;
    }
    res.cookie('user', JSON.stringify({
      'username': username,
      'role': role
    }));
    res.render('index');
  })
};
