var _ = require('lodash');
var crypto = require('crypto');
var uuid = require('node-uuid');

/** @module User */
module.exports = {
  attributes: {
    username: {
      type: 'string',
      unique: true,
      index: true,
      notNull: true
    },
    email: {
      type: 'email',
      unique: true,
      index: true
    },
    passports: {
      collection: 'Passport',
      via: 'user'
    },
    roles: {
      collection: 'Role',
      via: 'users',
      dominant: true
    },
    permissions: {
      collection: "Permission",
      via: "user"
    },
    token: {
      type: 'string'
    },

    getGravatarUrl: function () {
      var md5 = crypto.createHash('md5');
      md5.update(this.email || '');
      return 'https://gravatar.com/avatar/'+ md5.digest('hex');
    },

    toJSON: function () {
      var user = this.toObject();
      delete user.password;
      user.gravatarUrl = this.getGravatarUrl();
      return user;
    }
  },

  beforeCreate: function (user, next) {
    if (_.isEmpty(user.username)) {
      user.username = user.email;
    }
    user.token = uuid.v4();
    next();
  },

  afterCreate: [
    function setOwner (user, next) {
      sails.log.verbose('User.afterCreate.setOwner', user);
      User
        .update({ id: user.id }, { owner: user.id })
        .then(function (user) {
          next();
        })
        .catch(function (e) {
          sails.log.error(e);
          next(e);
        });
    },
    function attachDefaultRole (user, next) {
      sails.log('User.afterCreate.attachDefaultRole', user);
      User.findOne(user.id)
        .populate('roles')
        .then(function (_user) {
          user = _user;
          return Role.findOne({ name: 'registered' });
        })
        .then(function (role) {
          user.roles.add(role.id);
          return user.save();
        })
        .then(function (updatedUser) {
          sails.log.silly('role "registered" attached to user', user.username);
          next();
        })
        .catch(function (e) {
          sails.log.error(e);
          next(e);
        })
    }
  ],

  /**
   * Register a new User with a passport
   */
  register: function (user) {
    return new Promise(function (resolve, reject) {
      sails.services.passport.protocols.local.createUser(user, function (error, created) {
        if (error) return reject(error);

        resolve(created);
      });
    });
  }
};
