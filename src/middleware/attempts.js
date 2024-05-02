const RateLimit = require('express-rate-limit');

const ApiRateLimiter = RateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 5,
	message: 'Too many attempts. Please try again in 1 minute'
});


module.exports = ApiRateLimiter;