const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const flash = require('connect-flash');
const passport = require('passport');
const passportConfig = require('./passport');
const path = require('path');
const loginRequired = require('./libs/loginRequired');
// const nunjucks = require('nunjucks');
const ejs = require('ejs');

const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const db = require('./models');

const app = express();
const port = process.env.PORT;

dotenv.config();
db.sequelize.sync();
passportConfig();

// app.engine('html', nunjucks.render);
// app.set('view engine', 'html');

// nunjucks.configure('views', {
// 	autoescape: true,
// 	express: app,
// 	watch: true
// });

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_PASSWORD));
app.use(
	session({
		secret: process.env.COOKIE_PASSWORD,
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			secure: false,
			maxAge: 2000 * 60 * 60
		}
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/libs', express.static('libs'));
app.use('/public', express.static('public'));
app.use('/style', express.static('style'));

const accounts = require('./routes/accounts');
const product = require('./routes/product');

app.use('/accounts', accounts);
app.use('/product', product);

app.use((req, res, next) => {
	app.locals.isLogin = req.isAuthenticated();
	app.locals.userData = req.user;
	app.locals.limit = 4;

	next();
});

app.get('/', csrfProtection, (req, res) => {
	console.log(process.env.SALT);
	res.render('accounts/login', {
		csrfToken: req.csrfToken(),
		flashMessage: req.flash().error
	});
});

app.get('/main', loginRequired, async (req, res) => {
	res.render('main/home', {
		array: [
			'mike',
			'james',
			'teddy',
			'july',
			'eddie',
			'mike',
			'james',
			'teddy',
			'july',
			'eddie',
			'mike',
			'james',
			'teddy',
			'july',
			'eddie',
			'mike',
			'james',
			'teddy',
			'july',
			'eddie'
		]
	});
});

app.get('/home', (req, res) => {
	res.render('home');
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running at http://127.0.0.1/${process.env.PORT}`);
});
