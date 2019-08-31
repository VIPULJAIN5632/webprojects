const route = require('express').Router()

route.get('/', (req, res) => {
    if (req.user) {
        return res.redirect('/insidenet')
    } else {
        res.redirect('/signin')
    }
})

exports = module.exports = route