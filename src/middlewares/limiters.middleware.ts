import rateLimit from 'express-rate-limit';

export const oneMinuteLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Too many requests, please try again after a minute',
  handler: (req, res, next, options) => {
    res.status(429).json({
      error: 'Rate limit exceeded',
      details: options.message,
      retryAfter: `${options.windowMs / 1000} seconds`,
    });
  },
});

export const twentyFourHourLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 10,
  message: 'Too many requests, please try again after a day',
  handler: (req, res, next, options) => {
    res.status(429).json({
      error: 'Rate limit exceeded',
      details: options.message,
      retryAfter: `${options.windowMs / 1000 / 60 / 60} hours`,
    });
  },
});
