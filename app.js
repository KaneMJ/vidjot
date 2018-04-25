const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-development')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const port = 5000;

app.listen(port, ()=> {
    console.log(`Server started on port ${port}`);
});

// Handlebars Midleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method Override midlleware
app.use(methodOverride('_method'));

// Middleware for express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

//Global Variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Index Route
app.get('/', (req, res)=> {
    const title = 'Welcome';
    res.render('index', {
        title: title
    });
});

// About Route
app.get('/about', (req, res)=> {
    res.render('about');
});

// User Login Route
app.get('/users/login', (req, res) => {
    res.send('login');
});

// User Register Route
app.get('/users/register', (req, res) => {
    res.send('register');
});

// Use routes
app.use('/ideas', ideas);
app.use('/users', users);

