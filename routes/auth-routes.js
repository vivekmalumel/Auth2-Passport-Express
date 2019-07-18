const router=require('express').Router();
const passport=require('passport');
//auth login

router.get('/login',(req,res)=>{
    res.render("login",{user:req.user});
});

//auth with google
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));

// callback route for google to redirect to: alredy given in api console
router.get('/google/redirect',passport.authenticate('google'), (req, res) => {
    //res.send(req.user);
    res.redirect('/profile')
});

router.get('/logout',(req,res)=>{
    //handle with passport
    //res.send('Logging Out');
    req.logOut();
    res.redirect('/');
})

module.exports=router;