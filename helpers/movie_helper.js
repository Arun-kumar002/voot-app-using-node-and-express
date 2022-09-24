module.exports={
    ensureAuthenticated:function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        else{
            req.flash('error_message','your are not autherized')
            res.redirect('/movies/login',301,{})
        }
    }
}