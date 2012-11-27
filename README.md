# Passport-Signature

## Usage
Add "passport-signature" to your `package.json` file. Then, `(sudo) npm install -l`.

## Config
In the latest version, this module has been updated to use an `app` variable for the URLs for the 
Signature OAuth app. You can do something like:  

    app.set('sigAuthDomain', 'http://localhost...')

The _only_ reason that you would want to do this is if you were testing OAuth against another OAuth Server.
If in doubt, don't set the `app` variable above.

## Notes
Tested against the `example` project in [this](https://github.com/jaredhanson/oauth2orize) OAUTH2 provider repo.

###Thanks 
[Jared Hanson](https://github.com/jaredhanson/)

###License 
MIT
