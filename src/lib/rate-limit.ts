import { Ratelimit } from "@upstash/ratelimit";

import { redis } from "./redis";

// 3 requests for IP in 15 minutes
export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "15 m"),
  analytics: true,
  prefix: "comments"
});
