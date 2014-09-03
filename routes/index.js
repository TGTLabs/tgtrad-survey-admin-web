"use strict";

module.exports = function (app) {
  app.get("/*", function (req, res) {

    var role, username;

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
