import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

export function setup(User, config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: [
      'displayName',
      'emails'
    ]
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOneAsync({
      'facebook.id': profile.id
    })
      .then(user => {
        if (user) {
          return done(null, user);
        }

        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          role: 'user',
          provider: 'facebook',
          facebook: profile._json
        });
        user.saveAsync()
          .then(saveResult => {
            // mongoose save returns (err, obj, numaffected)
            // bluebird only expects 2 arguments so it wraps the extras in an array
            var user = saveResult[0];
            done(null, user)
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }));
}
