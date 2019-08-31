const route = require('express').Router()
const passport = require('../passport')
const Users = require('../db').Users

route.get('/', (req, res) => {
    res.render('index')
})
route.get('/signin', (req, res) => {
    res.render('signin')
})
route.get('/signup', (req, res) => {
    res.render('signup')
})

route.post('/signin', passport.authenticate('local', {
    failureRedirect: '/signin',
    successRedirect: '/private'
}))

route.post('/signup', (req, res) => {
    Users.create ({
        
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).then((createdUser) => {
        res.redirect('/signin')
    })
})
route.get('/insidenet',(req, res)=> {
    if (req.user) {
        return res.render('inside')
    } else {
        res.redirect('/signin')
    }

})

route.get('/logout', function (req, res) {
    req.logOut();
    res.status(200).clearCookie('connect.sid', {
      path: '/'
    });
    req.session.destroy(function (err) {
      res.redirect('/');
    });
  });

exports = module.exports = route