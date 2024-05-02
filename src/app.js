const express = require('express');
const router = express.Router();

const indexRoutes = require('./routes/index');
const gameRoutes = require('./routes/game');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

router.use('/index', indexRoutes);
router.use('/game', gameRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;






// const express = require('express');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const path = require('path');
// const { createServer } = require('node:http');
// const { join } = require('node:path');
// const { Server } = require('socket.io');
// // const jsVectorMap = require('jsvectormap');
// // import 'jsvectormap/dist/maps/world.js';

// // const map = new jsVectorMap({
// // 	selector: '#map',
// // 	map: 'world'
// // });

// const app = express();
// const router = express.Router();
// // const server = createServer(app);
// // const io = new Server(server);

// const sessionMiddleware = session({
// 	secret: "newSecret",
// 	resave: true,
// 	saveUninitialized: true
// });

// // app.use(sessionMiddleware);
// // io.engine.use(sessionMiddleware);

// // var genuuid = require('uuid').v4;

// router.use(express.static(path.join(__dirname, 'public')));
// router.use(cookieParser());

// // ============ ROUTES ============

// // main page
// // app.get('/', (req, res) => {
// // 	console.log('test');
// // 	res.send('test');
// // });

// router.get('/test', (req, res) => {
// 	res.send('test');
// });


// /**
// app.get('/', (req, res) => {
// 	console.log("test");
// 	if (!req.session.username) {
// 		res.redirect('/auth/login');
// 		return;
// 	}
	
// 	console.log(req.session.username);
// 	// get message history


// 	res.sendFile(join(__dirname, 'public/index.html'));
// });

// app.get('/test', (req, res) => {
// 	// var canada = require('./public/js/maps/canada.js');

// 	res.sendFile(join(__dirname, 'public/test.html'));

// });

// app.get('/?chatID', (req, res) => {
// 	if (!req.session.username) {
// 		res.redirect('/auth/login');
// 		return;
// 	}
	
	
// 	// get message history
// });

// const authenticationRoutes = require('./routes/auth');

// app.use('/auth/', authenticationRoutes);

// app.get('/game', (req, res) => {
// 	if (!req.session.username) {
// 		res.redirect('/auth/login');
// 		return;
// 	}
// 	res.send('<h1>Game</h1>' + req.session.username);
// 	// res.sendFile(join(__dirname, 'public/game/game.html'));
// });

// */

// // ============ SOCKET.IO ============

// /**
// io.on('connection', (socket) => {
// 	// get ?chatID
// 	  console.log('a user connected');
// 	  const session = socket.request.session;

// 	  if (!session.username) {
// 		console.log("User not authenticated");

// 		// go to login page
// 		io.emit('redirect', '/auth/register');

// 		return;
// 	  }

// 	  socket.on('chat message', (msg) => {
// 		io.emit('chat message', session.username + ": " + msg);

// 	  });

// 	  socket.on('disconnect', () => {
// 		console.log('user disconnected');
// 	  });
// });

// */

// // async function testMongoDB() {
// // 	try {
// // 		await mongoClient.connect();
// // 		await mongoClient.db('Blitz1914').command({ ping: 1 });
// // 		console.log("Pinged your deployment. You're good to go!");
// // 	} finally {
// // 		await mongoClient.close();
// // 	}
// // }

// // app.listen(process.env.APP_PORT, () => {
// // 	  console.log('Server is running on http://localhost:' + process.env.APP_PORT);
// // 	//   console.log('Session id ' + session.id);
// // });

// // app.listen(3000, () => {
// // 	console.log('Server is running on http://localhost:3000');
// // });

