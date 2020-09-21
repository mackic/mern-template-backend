const passport = require("passport");
const BearerStrategy = require("passport-http-bearer");
const FacebookStrategy = require("passport-facebook");

const keys = require("../config/keys");

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new BearerStrategy(function (token, done) {
        User.findOne({ token: token }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user, { scope: "all" });
        });
    })
);

passport.use(
    new FacebookStrategy(
        {
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:3000/auth/facebook/callback",
        },
        function (accessToken, refreshToken, profile, cb) {
            User.findOrCreate({ facebookId: profile.id }, function (err, user) {
                return cb(err, user);
            });
        }
    )
);

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true,
        },

        async (accessToken, refreshToken, profile, cb) => {
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                return done(null, existingUser);
            }
            
            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
        }
    )
);
