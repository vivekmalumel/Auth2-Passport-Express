const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const keys=require('./keys');
const User=require('../models/user-model');

passport.use(
    new GoogleStrategy({
        //options for google strategy
        clientID:keys.google.clientID,//from google+api 
        clientSecret:keys.google.clientSecret,
        callbackURL: "/auth/google/redirect"

    },(accessToken,refreshToken,profile,done)=>{
        //passport callback function
        //check if user already exist in db

        User.findOne({googleId:profile.id})
            .then((curUser)=>{
            if(curUser)
                {  
                console.log("User is :"+curUser);
                }
                else{
                    new User({
                        username:profile.displayName,
                        googleId:profile.id
                    }).save()
                    .then((newUser)=>{
                        console.log('new user was created:'+newUser)
                    })
                }
                
            })

    }
))