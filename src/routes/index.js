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
	// send ../public/views/index.html
    res.sendFile('index.html', { root: 'src/public/' });
});

module.exports = router;