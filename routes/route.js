const express = require('express')
const router = express.Router()
const { ensureAuth , ensureGuest }  = require('../middleware/auth')

//Login
router.get('/login',ensureAuth ,(req,res) => {
    res.render('login')
})
//ensureAuth for ensuring that without login no one can come to dashboard page
router.get('/dashboard', (req,res) => {
    res.render('dashboard',{
    nameUser :req.user.displayName,
    })
})



module.exports = router