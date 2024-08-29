import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redisClient from "@/lib/redisClient";

const createRateLimiter = (maxRequests: number) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: maxRequests,
    store: new RedisStore({
      sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    standardHeaders: true,
    legacyHeaders: false,
  });

const authRateLimiter = createRateLimiter(10);
const generalRateLimiter = createRateLimiter(10000);

export { generalRateLimiter, authRateLimiter };
