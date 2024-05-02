const express = require('express');
const router = express.Router();

// avoid accessing user routes without being logged in
router.get('/*', (req, res, next) => {
	if (!req.session.username) {
		res.redirect('/auth/login');
		return;
	}

	next();
});

router.use('/profile', (req, res) => {
	res.send('profile');
});


module.exports = router;