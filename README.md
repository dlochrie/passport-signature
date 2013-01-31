# Passport-Signature

## Usage
Add "passport-signature" to your `package.json` file. Then, `(sudo) npm install -l`.

## Config
Create a new json file in your config directory:

    /
    --/config/
      --passport.json

And the file should look like this:

    {
      "development": { 
          "host": "http://www.signature.com"
        , "path": "/"
        , "signature": {
            "host": "http://sigauth-dev.ad.bcm.edu"
          , "path": "/"
          , "license": "abc123"
          , "secret": "ssh-secret"
        }
      },
      "qa": { 
        "host":   "http://qa.sigui.signature.com"
      , "path":   "/"
      , "signature": {
            "host": "http://sigauth-dev.ad.bcm.edu"
          , "path": "/"
          , "license": "abc123"
          , "secret": "ssh-secret"
        }
      }
    }

..etc.

## Notes
Tested against the `example` project in [this](https://github.com/jaredhanson/oauth2orize) OAUTH2 provider repo.

###Thanks 
[Jared Hanson](https://github.com/jaredhanson/)

###License 
MIT
