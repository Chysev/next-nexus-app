// Use session if you want to store something in the server side
import crypto from "crypto";
import RedisStore from "connect-redis";
import redisClient from "@/lib/redisClient";
import expressSession from "express-session";

const sessionSecret = crypto.randomBytes(32).toString("base64");

const session = expressSession({
  store: new RedisStore({ client: redisClient }),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60000,
  },
});

export default session;
