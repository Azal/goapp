/// <reference path="../../typings/tsd.d.ts" />
/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help     :: See http://links.sailsjs.org/docs/controllers
 */

import e = require('express');

var UsersController = {
  login: function (req: e.Request, res: e.Response) {
    if (!req.param("token")){
      return res.badRequest();
    }
    User.findOne({ token: req.param("token")}, function(err, user){
      if(err){
        return res.nogotiate(err);
      }
      if(!user){
        return res.notFound();
      }
      req.session.current_user = user.id;
      return res.json(user.toJSON());
    })
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
    req.session.me = null;
    return res.json(true);
  },


  /**
   * `UserController.dashboard()`
   */
  dashboard: function (req, res) {
    return res.json({
      todo: 'dashboard() is not implemented yet!'
    });
  },


  /**
   * `UserController.index()`
   */
  index: function (req, res) {
    return res.json({
      todo: 'index() is not implemented yet!'
    });
  }


};

module.exports = UsersController;
