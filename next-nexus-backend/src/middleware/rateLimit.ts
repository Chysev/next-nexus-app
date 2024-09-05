import redisClient from "@/lib/redisClient";
import { Request, Response, NextFunction } from "@/types/express-types";

const rateLimiter = (rule: RateLimiterRule) => {
  const { rate_limit } = rule;
  return async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    const redisId = `${req.path}/${ip}`;

    const requestCount = await redisClient.incr(redisId);
    if (requestCount === 1) {
      await redisClient.expire(redisId, rate_limit.time);
    }

    if (requestCount > rate_limit.limit) {
      return res.status(429).json({
        data: { message: "Too many requests, try again later." },
      });
    }

    next();
  };
};

const dataRateLimiter: RateLimiterRule = {
  rate_limit: {
    time: 60,
    limit: 10,
  },
};

const generalRateLimiter: RateLimiterRule = {
  rate_limit: {
    time: 60,
    limit: 1000,
  },
};

export { dataRateLimiter, generalRateLimiter };
export default rateLimiter;
