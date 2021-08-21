const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const User =  require('../models/User')

module.exports = function(passport){
    passport.use(new GoogleStrategy({
          clientID: '392031116277-44dc5ck6vtqpc9205iq0652tag7sttso.apps.googleusercontent.com',
          clientSecret: 'wneaxIVhogr7hJm2EM61F6ze',
          callbackURL: 'http://localhost:5000/auth/google/callback'
},
   async(accessToken, refreshToken, profile,done) =>{
    // console.log(profile) Printing the profile data
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        image: profile.photos[0].value
    }
    //Save Profile Data in the DATABASE
       try {
           let user= await User.findOne({googleId:profile.id})
           if(user){
               done(null,user)
           }
           else{
               user = await User.create(newUser)
               done(null,user)
           }
       } catch (err) {
           console.error(err)
       }
}
    ))

    passport.serializeUser(function(user,done){
        done(null,user.id)
    })
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user)
        })
    })
}

