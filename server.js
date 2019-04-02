const express = require('express');
const path = require('path');
// const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/database').mongoURI;

// Connect to MongoDB
mongoose
   .connect(db)
   .then(() => console.log('MongoDB Connected'))
   .catch(err => console.log(err));

// Express session middleware
app.use(session({
   secret: 'secret',
   resave: true,
   saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
require('./config/passport')(passport);

// Global variables
app.use(function(req, res, next){
   // res.locals.success_msg = req.flash('success_msg');
   // res.locals.error_msg = req.flash('error_msg');
   // res.locals.error = req.flash('error');
   res.locals.user = req.user || null;
   next();
});

// Use routes
app.use('/ideas', ideas);
app.use('/users', users);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
   // Set static folder
   app.use(express.static('client/build'));
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));