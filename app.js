const express = require('express');
const app = express();
const appRoutes = require('./app/app');

app.get('/', (req, res) => {
	res.send('index');
});

app.use('/', appRoutes);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
