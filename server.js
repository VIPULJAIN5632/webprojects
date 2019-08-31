const dotenv = require('dotenv');

if(process.env.NODE_ENV !== 'production'){
   dotenv.config()
}

const stripeSecretKey=process.env.STRIPE_SECRET_KEY
const stripePublicKey=process.env.STRIPE_PUBLIC_KEY

console.log(stripeSecretKey)
const express = require('express')
const session = require('express-session')
const passport = require('./passport')

const SERVER_PORT = process.env.PORT || 9876
const app = express()
const fs  = require('fs')
const stripe= require('stripe')(stripeSecretKey)
app.set("view engine", "hbs")

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'somesecretstring'
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/public', require('./routes/public'))
app.use('/private', require('./routes/private'))
app.use('/', require('./routes/root'))
app.use('/logout', require('./routes/root'))


app.get('/subscription', (req, res)=>{
 res.render('subscription')
})

app.post('/purchase', (req, res)=>{
  console.log('purchase')
  console.log(req.body.amount)
  console.log(req.body.stripeToken)
//   stripe.charges.create({
//       amount: req.body.amount,
//       source:req.body.stripeToken,
//       currency:'inr'
//   }).then(function(){
//       console.log('Payment successful')
//       res.json({ message: 'Subscription granted'})
//   }).catch(function(){
//       console.log('payment failed')
//       res.status(500).end()
//   })
   })


app.get('/plans', (req, res) => {
    res.render('plans')
})

app.listen(SERVER_PORT, () => console.log("Server running on http://localhost:9876"))