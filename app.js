const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', './src/view');

const handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	res.render('index', {title: 'Hello from render', list: ['a', 'b']});
});

app.get('/book', (req, res) => {
	res.send('Hello Book');
});
app.listen(port, (err) => {
	console.log('Listening on port', port);
});