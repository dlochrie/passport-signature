/**
 * Module dependencies.
 */
var util = require('util')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;

/**
 * `Strategy` constructor.
 *
 * This Strategy borrows heavily from Jared Hanson's 'passport-facebook' 
 * strategy: 
 *
 * https://github.com/jaredhanson/passport-facebook 
 * 
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
	sigAuthDomain = 'http://some-url-tbd.com';
	profileURL = (app._locals.settings['sigAuthDomain']) ? app._locals.settings['sigAuthDomain'] : sigAuthDomain;
  options.authorizationURL =  profileURL + '/dialog/authorize';
  options.tokenURL = profileURL + '/oauth/token';
  options.scopeSeparator = options.scopeSeparator || ',';
  
  OAuth2Strategy.call(this, options, verify);
  this.name = 'signature';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);

/**
 * Return extra Signature-specific parameters to be included in the authorization
 * request.
 *
 * Options:
 *  - `display`  Display mode to render dialog, { `page`, `popup`, `touch` }.
 *
 * @param {Object} options
 * @return {Object}
 * @api protected
 */
Strategy.prototype.authorizationParams = function (options) {
  var params = {},
      display = options.display;

  if (display) {
    params['display'] = display;
  }

  return params;
};

/**
 * Retrieve user profile from Signature.
 *
 * TODO: Normalize these fields so that they look like Signature data.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `facebook`
 *   - `id`               the user's Signature ID
 *   - `username`         the user's Signature username
 *   - `displayName`      the user's full name
 *   - `name.familyName`  the user's last name
 *   - `name.givenName`   the user's first name
 *   - `name.middleName`  the user's middle name
 *   - `gender`           the user's gender: `male` or `female`
 *   - `profileUrl`       the URL of the profile for the user on Signature
 *   - `emails`           the proxied or contact email address granted by the user
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
	sigAuthDomain = 'http://some-url-tbd.com';
	profileURL = (app._locals.settings['sigAuthDomain']) ? app._locals.settings['sigAuthDomain'] : sigAuthDomain;
  profileURL += '/api/userinfo';
  this._oauth2.getProtectedResource(profileURL, accessToken, function (err, body, res) {
    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }
    
    try {
      var json = JSON.parse(body);
      
      var profile = { provider: 'signature' };
      profile.id = json.user_id;
      profile.username = json.username;
      profile.displayName = json.name;
      profile.name = { familyName: json.last_name,
                       givenName: json.first_name,
                       middleName: json.middle_name };
      profile.gender = json.gender;
      profile.profileUrl = json.link;
      profile.emails = [{ value: json.email }];
      
      profile._raw = body;
      profile._json = json;
      
      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
