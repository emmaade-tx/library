const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
const nav = [
			{
				Link: '/books', 
				Text: 'Book'
			}, 
			{
				Link: '/authors', 
				Text: 'Author'
			}
];
app.use(express.static('public'));
app.set('views', './src/views');

const bookRouter = require('./src/routes/bookROutes')(nav);

app.set('view engine', 'ejs');

app.use('/books', bookRouter);

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Hello from render', 
		nav: [
			{
				Link: '/books', 
				Text: 'Books'
			}, 
			{
				Link: '/authors', 
				Text: 'Authors'
			}
		]
	});
});

app.get('/book', (req, res) => {
	res.send('Hello Book');
});

app.listen(port, (err) => {
	console.log('Listening on port', port);
});
