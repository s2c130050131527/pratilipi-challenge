import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "./src/User/UserModel";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    (accessToken, refresh, profile, done) => {
      UserModel.findOne({
        gid: profile.id,
      }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser);
        } else {
          const newUser = {
            gid: profile._json.sub,
            name: profile._json.name,
            picture: profile._json.picture,
            email: profile._json.email,
          };
          new UserModel(newUser).save().then((newUserDb) => {
            done(null, newUserDb);
          });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id).then((user) => {
    done(null, user);
  });
});
