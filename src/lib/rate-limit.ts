import { Ratelimit } from "@upstash/ratelimit";

import { redis } from "./redis";

export const contactRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "15 m"),
  analytics: true,
  prefix: "contact-form",
});

export const capitalsRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
  prefix: "capitals",
});

