import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import CookieSession from "cookie-session";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import "./database";
import passport from "passport";
import "./passport";
var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  CookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", indexRouter);
app.use("/users", usersRouter);
export default app;
