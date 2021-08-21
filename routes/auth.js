const express = require('express')
const passport = require('passport')
const router = express.Router()

//Authenticate with Google
//GET request to /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] })
)
//Google auth callback
//GET request to /auth/google/callback
router.get(
    '/google/callback',
     passport.authenticate('google',{
failureRedirect: '/login'
}),
  (req,res) => {
  
//   res.send('Email is Authorised')
  res.redirect('/dashboard')
}
)

// Logout
// auth.logout
router.get('/logout',(req,res) => {
    req.logout()
    res.redirect('/')
})


module.exports = router