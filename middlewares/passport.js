//local stratergy
let LocalStratergy=require('passport-local').Strategy;
let authSchema=require('../Model/Auth')
let bcrypt=require('bcryptjs')

module.exports=(passport)=>{
    passport.use(
       new LocalStratergy({usernameField:'email'},async function(email,password,done){
          let user=await authSchema.findOne({email})
          //user exist or not
          if(!user){
            return done(null,false,{message:'user is not found'})
          }
          //compare pass
           bcrypt.compare(password,user.password,(err,isMatch)=>{
           
            if(err) throw err;
            if(!isMatch){
               
               return done(null,false,{message:'password is not match'})
              
               }
            else{
                console.log(isMatch)
                return done(null,user)
            }
           })

        })
    );
    passport.serializeUser(function(user,done){
        done(null,user.id)
        console.log(user.id)
        
    })
    passport.deserializeUser(function(id,done){
        authSchema.findById(id,function(err,user)
        {
          done(err,user)
       

        })//get data from session
    })
}