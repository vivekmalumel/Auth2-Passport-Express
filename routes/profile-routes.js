const router=require('express').Router();


const authCheck=(req,res,next)=>{
    if(!req.user){
        //if user not logged in
        res.redirect('/auth/login');
    }
    else{
    // is logged in
        next();
    }
}

router.get('/',authCheck,(req,res)=>{
    //res.send('you are logged in , Welcome '+req.user.username);
    res.render('profile',{user:req.user});
})


module.exports=router;