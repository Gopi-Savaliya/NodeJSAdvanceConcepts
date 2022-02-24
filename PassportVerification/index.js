const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const db = require('./dbConnection');
const session = require('express-session');
const app = express();

app.use(session({ 
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

passport.use(new LocalStrategy(
    // {
    //     usernameField: "username",
    //     passwordField: "password"
    // },
    function(username, password, done) {
        db.query(
            'SELECT * FROM users where username = ? and password = ?', 
            [username, password],
            (err, user) => {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user);
            }
        );
    }
));

passport.serializeUser((user, done) => {
    return done(null, user);
});
passport.deserializeUser((user, done) => {
    return done(null, user);
});

// app.post('/login/password', (req, res) => passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   })(req, res));

app.post('/login/validation', passport.authenticate('local'), (req, res) => {
    if(req.user.length !== 0){
        res.redirect('/');    
    }
    else {res.redirect('/login');}
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.listen(3000);
