const express = require('express');
const app = express();

// use session
const session = require('express-session');
app.use(session({
	secret: "newSecret",
	resave: true,
	saveUninitialized: true
}));

app.use(express.static(__dirname + '/src/public'));

// initialize session


app.get('/*', (req, res, next) => {
	// to do something on every GET request
	req.session.username = "dev";
	
	next();
});

app.get('/', (req, res) => {
	res.redirect('/index');
});

const appRoutes = require('./src/app');
app.use('/', appRoutes);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});