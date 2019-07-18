const express=require('express');
const authRoutes=require('./routes/auth-routes');
const profileRoutes=require('./routes/profile-routes')
const passportSetup=require('./config/passport-setup');
const mongoose=require('mongoose');
const keys=require('./config/keys');
const cookieSession=require('cookie-session');
const passport=require('passport')

const app=express();

//setup view engine
app.set('view engine','ejs');


app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}))

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongoDB
mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser: true},()=>{
    console.log('Connected to mongo Db');
})


//setup routes
    app.use('/auth',authRoutes);
    app.use('/profile',profileRoutes);
//create Home Route
 app.get('/',(req,res)=>{
    res.render("home");// in views/home.ejs
 })


 app.listen(3000,()=>{
     console.log('App now listening for request on port 3000');
 });