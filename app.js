const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.static('src/view'));
app.get('/', (req, res) => {
	res.send('Hello world');
});

app.get('/book', (req, res) => {
	res.send('Hello Book');
});

app.listen(port, (err) => {
	console.log('Listening on port', 5000);
});