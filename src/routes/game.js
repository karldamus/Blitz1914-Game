const express = require('express');
const router = express.Router();


// avoid accessing game routes without being logged in
router.get('/*', (req, res, next) => {
	if (!req.session.username) {
		res.redirect('/auth/login');
		return;
	}

	next();
});

router.get('/:gameID', async (req, res) => {
	const gameID = req.params.gameID;
	var gameDetails = await getGameDetails(gameID);
	

	res.send(`<h1>Game ${gameID}</h1>`);
});

async function getGameDetails(gameID) {
	return {
		gameID: gameID,
		players: [
			{
				username: 'myboyevaaaanderr',
				email: 'getaholdofkarl@gmail.com',
			}
		]
	}
}

module.exports = router;