import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { mockData } from "../utils/constant.mjs";

passport.serializeUser((user, done) => {
  done(user, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const findUser = mockData.find((user) => {
      user.id === id;
    });
    if (!findUser) throw new Error("invalid");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, (username, password, done) => {
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);

    try {
      const findUser = mockData.find((user) => user.username === username);
      if (!findUser) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (findUser.password !== password) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, findUser);
    } catch (error) {
      return done(error);
    }
  })
);

export default passport;
