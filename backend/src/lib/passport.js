import passport from "passport";
// const GoogleUser = require("../models/GoogleUsers");
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();


// RUNS WHEN USER LOGS IN
passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.clientID, 
      clientSecret:process.env.clientSecret, 
      callbackURL:process.env.callbackURL, 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists
        let existingUser = await GoogleUser.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser); // If user exists, proceed
        }
        // IF user not exists Create new user
        const newUser = new GoogleUser({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value, // Optional
        });

        await newUser.save(); // Save user to DB
        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
)

// RUNS IMMEDIATELY AFTER 1 FUN (GOOGLE STRATEGY)
passport.serializeUser((newUser, done) => {
  done(null, newUser._id); // Store user ID in session which is in our db and gives that session id as newUser._id to client side (browser's cookie)
});


// RUNS AT EVERY REQUEST AND ATTACH USER DATA TO Req.User
passport.deserializeUser(async (id, done) => {
   // (id) it is the newUser._id, what we have put in serealizeuser we get it from browser cookie
  try {
      const user = await GoogleUser.findOne({ _id: id }); // Retrieve user from DB
     
      done(null, user); // Attach user to req.user
  } catch (error) {
      console.error('Deserialization error:', error); // Debugging line
      done(error, null);
  }
});
