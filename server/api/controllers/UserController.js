/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * @override
   */
  create: function (req, res, next) {
    if (!req.param("email") || !req.param("password") || !req.param("username")) {
      sails.log("Missing email or password or username");
      sails.log(req.body);
      return res.badRequest();
    }

    sails.services.passport.protocols.local.register(req.body, function (err, user) {
      if (err) return res.negotiate(err);
      res.ok(user);
    });
  },

  me: function (req, res) {
    res.ok(req.user);
  }
};
