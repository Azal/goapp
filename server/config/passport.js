/**
 * Passport configuration
 *
 * This is the configuration for your Passport.js setup and it where you'd
 * define the authentication strategies you want your application to employ.
 *
 * Authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {
  local: {
    strategy: require('passport-local').Strategy
  },

  basic: {
    strategy: require('passport-http').BasicStrategy,
    protocol: 'basic'
  },

  google: {
    name: 'Google',
    protocol: 'oauth2',
    strategy: require('passport-google-oauth').OAuth2Strategy,
    options: {
      callbackURL: "http://goeditor.lvh.me:3000/auth/google/callback",
      clientID: '1095800440517-t0vrjdbjfguk7f8lcd0tgeol8e9umoon.apps.googleusercontent.com',
      clientSecret: 'ACGei-CGxcSDdpbrwj4QnelI',
      scope: ['profile', 'email']
    }
  },
  twitter: {
    name: 'Twitter',
    protocol: 'oauth',
    strategy: require('passport-twitter').Strategy,
    options: {
      callbackURL: "http://127.0.0.1:3000/auth/twitter/callback",
      consumerKey: 'vyUaiLLcjRsPKwcZHw5BehjMZ',
      consumerSecret: 'peB1X8AxRFJfSFJWKHZvVxRIumkGdeZt2Mo6ejH2EIPnA72eAb'
    }
  },
  /*github: {
    name: 'GitHub',
    protocol: 'oauth2',
    strategy: require('passport-github').Strategy,
    options: {
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret'
    }
  },*/
  facebook: {
    name: 'Facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    options: {
      clientID: '1149496168429180',
      clientSecret: 'c16c4dd5477385486e939ae53edd00ff',
      callbackURL: "http://goeditor.lvh.me:3000/auth/facebook/callback",
      scope: ['public_profile', 'email'],
      profileFields: ['email', 'id', 'displayName']
    }
  }
  /*youtube: {
    name: 'Youtube',
    protocol: 'oauth2',
    strategy: require('passport-youtube').Strategy,
    options: {
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret'
    },
  },
  'youtube-v3': {
    name: 'Youtube',
    protocol: 'oauth2',
    strategy: require('passport-youtube-v3').Strategy,
    options: {
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret'
      // Scope: see https://developers.google.com/youtube/v3/guides/authentication
      scope: [ 'https://www.googleapis.com/auth/youtube.readonly' ],
    },
  },
  */

};