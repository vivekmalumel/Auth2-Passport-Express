const express=require('express');
const authRoutes=require('./routes/auth-routes');
const passportSetup=require('./config/passport-setup');

const app=express();

//setup view engine
app.set('view engine','ejs');

//setup routes
    app.use('/auth',authRoutes);
//create Home Route
 app.get('/',(req,res)=>{
    res.render("home");// in views/home.ejs
 })


 app.listen(3000,()=>{
     console.log('App now listening for request on port 3000');
 });