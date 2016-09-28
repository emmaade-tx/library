const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

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
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

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
