import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { mockData } from "../utils/constant.mjs";
import { User } from "../mongoose/schemas/data.mjs";

passport.serializeUser((user, done) => {
  done(user, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("invalid");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (username, password, done) => {
      try {
        const findUser = await User.findOne({ username });
        if (!findUser) throw new Error("user not found");
        if (findUser.password !== password) throw new Error("bad crediencial");
        done(null, findUser)
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
