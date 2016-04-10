var uuid = require('node-uuid');
var _ = require('lodash');
var _super = require('sails-permissions/api/models/User');

/* OVERRIDES */
_.merge(exports, _super);
_.merge(exports, {
  attributes: {
    token: {
      type: 'string'
    },

    toJSON: function () {
      var user = this.toObject();
      delete user.password;
      user.url = this.getGravatarUrl();
      return user;
    }
  },

  beforeCreate: [function (user, next) {
    if (_.isEmpty(user.username)) {
      user.username = user.email;
    }
    user.token = uuid.v4();
    next();
  }]
});
