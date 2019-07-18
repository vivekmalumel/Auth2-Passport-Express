const express=require('express');
const authRoutes=require('./routes/auth-routes');
const passportSetup=require('./config/passport-setup');
const mongoose=require('mongoose');
const keys=require('./config/keys');

const app=express();

//setup view engine
app.set('view engine','ejs');


// connect to mongoDB
mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser: true},()=>{
    console.log('Connected to mongo Db');
})


//setup routes
    app.use('/auth',authRoutes);
//create Home Route
 app.get('/',(req,res)=>{
    res.render("home");// in views/home.ejs
 })


 app.listen(3000,()=>{
     console.log('App now listening for request on port 3000');
 });