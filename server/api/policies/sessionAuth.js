/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  var token = req.param("token");
  if (token) {
    User.findOne({ token: token }).exec(function(err, user) {
      if (err || !user) {
        return res.forbidden('You are not permitted to perform this action.');
      }
      req.user = user;
      req.session.authenticated = true;

      Passport.find({ user: user.id }).exec(function(err, passports) {
        var pass;
        if (err || !passports) {
          pass = []
        } else {
          pass = passports;
        }
        req.userItems = pass;
        return next();
      });
    });
  } else {
    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
    if (req.session.authenticated) {
      return next();
    }

    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden('You are not permitted to perform this action.');
  }

};
