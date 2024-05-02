const express = require('express');
const router = express.Router();

router.get('/*', (req, res, next) => {
	if (!req.session.username) {
		res.redirect('/auth/login');
		return;
	}

	next();
});

router.get('/', (req, res) => {
	res.send('index');
});

module.exports = router;