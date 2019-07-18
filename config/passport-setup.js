const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const keys=require('./keys');
const User=require('../models/user-model');


passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
})


passport.use(
    new GoogleStrategy({
        //options for google strategy
        clientID:keys.google.clientID,//from google+api 
        clientSecret:keys.google.clientSecret,
        callbackURL: "/auth/google/redirect"

    },(accessToken,refreshToken,profile,done)=>{
        //passport callback function
        //check if user already exist in db
        // console.log(profile);
        User.findOne({googleId:profile.id})
            .then((curUser)=>{
            if(curUser)
                {  
                console.log("User is :"+curUser);
                done(null,curUser);
                }
                else{
                    new User({
                        username:profile.displayName,
                        googleId:profile.id,
                        thumbnail:profile._json.picture+'?sz=100'
                    }).save()
                    .then((newUser)=>{
                        console.log('new user was created:'+newUser)
                        done(null,newUser);
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            })
            
    }
))