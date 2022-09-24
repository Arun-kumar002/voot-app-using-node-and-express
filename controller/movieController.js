const MovieSchema=require('../Model/Movie')
const {connect}=require('mongoose')

const authSchema=require('../Model/Auth')
/*@http get method 
@access public
@url/movies/get-movies
*/
let GetMovies=async(req,res)=>{
  let movie= await MovieSchema.find({_id:req.params.id}).lean()
 res.render('movies/GetMovies',{movie})
}
//user auth get
let userRegister=async(req,res)=>{
  res.render('auth/userAuth')
}

//user login
let login_get=(req,res)=>{
  res.render('auth/login')
}


//create movie page
let GetMovie=async(req,res)=>{
    res.render('movies/create-movies')
   }
//get video
let SearchVideo= async (req,res)=>{
  res.render('movies/SearchVideos')
}
//update get req
let Update_movie_get=async(req,res)=>{
  let updatemovie= await MovieSchema.findOne({_id:req.params.id}).lean();
   res.render('movies/updateMovies',{updatemovie})
}

let profile=(req,res)=>{
  res.render('profile/userDetails')
}
/*@http post method 
@access private
@url/movies/create-movies
*/
let CreateMovie = async (req, res) => {
        try {
          let error=[];
          if(!req.body.movie_title){
            error.push({text:'movie title is req'})
          }
          else if(!req.body.movie_duration){
            error.push({text:'duration is req'})
          }
          else if(!req.body.movie_language){
            error.push({text:'language is req'})
          }
         else  if(!req.body.movie_certificate){
            error.push({text:'certification is req'})
          }
          else if(!req.body.movie_description){
            error.push({text:'description is req'})
          }
         else  if(!req.body.movie_audio_lang){
            error.push({text:'audion lang is req'})
          }
          if(error.length  > 0){
            res.render('movies/create-movies' ,{
              error,
              movie_title:req.body.movie_title,
              movie_duration:req.body.movie_duration,
              movie_language:req.body.movie_language,
              movie_genre:req.body.movie_genre,
              movie_year:req.body.movie_year,
              movie_certificate:req.body.movie_certificate,
              movie_description:req.body.movie_description,
              movie_category:req.body.movie_category,
            })
          }
          else{
            
          let {
            movie_title,
            movie_duration,
            movie_language,
            movie_genre,
            movie_year,
            movie_certificate,
            movie_description,
            movie_audio_lang,
            movie_category,
          } = req.body;
      
          let movie_img = req.files[0];
          let movie_video = req.files[1];
    
          let payload={movie_title,
            movie_duration,
            movie_language,
            movie_genre,
            movie_year,
            movie_certificate,
            movie_description,
            movie_audio_lang,
            movie_category,
            movie_img,
            movie_video,}
          let userEmail=await MovieSchema.findOne({movie_title})
          if(userEmail){
            req.flash('error_message','Already movie created inside the database')
            res.redirect('/movies/create-movies',301,{})
          }
          else{
            await new MovieSchema(payload).save()
            req.flash('success_message','successfully movie created')
            res.redirect('/movies/all-movies',301,{});
          }
          
        }
        } catch (error) {
          console.log(error);
        }
      };
      


let GetMovieObj=async(req,res)=>{
  let allGetMvie= await MovieSchema.find({}).lean()
  res.render('home',{allGetMvie})
 }

let Search_filter=async(req,res)=>{
  let {movie_title}=req.body;
 let list= await MovieSchema.find({$or:[{movie_title:{$regex:movie_title}},{movie_year:{$regex:movie_title}},{movie_description:{$regex:movie_title}},{movie_audio_lang:{$regex:movie_title}},{movie_category:{$regex:movie_title}},{movie_language:{$regex:movie_title}}]}).lean();
  res.render('movies/GetMovieObj',{list})
}


//user Auth post

const bcrypt=require('bcryptjs')
let auth;

let GetUser=async(req,res)=>{
  var {username,email,password}=req.body;
  let exist=await authSchema.findOne({email});
  if(exist){
    req.flash('error_message','account alread registered')
    res.redirect('/movies/register',301,{})
  }
  else{
    let user= await new authSchema({
      username,
      email,
      password
    }
     )
   
  bcrypt.genSalt(10, (err,salt)=>{
    if(err) throw err;
    bcrypt.hash(user.password,salt,async(err,hash)=>{
      if(err) throw err;
     user.password=hash;
     auth=user;
     res.render('auth/otpmsg')
     
    }) })
 
    
 }
}
//otp verify post 
let otppost=async(req,res)=>{
  let {otp}=req.body
  console.log(auth)
  console.log(otp)
  await auth.save()
  res.end('ok direct success')
}

//login post
const passport=require('passport');
let login_post=(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect:'/',
    successFlash:true,
    failureRedirect:'/movies/login',
    failureFlash:true,
  })(req,res,next)


}
//logout
const logout=(req,res)=>{
  req.logout(()=>{

  })//clear the session
  req.flash('SUCCESS_MSG','successfully logged out');
  res.redirect('/movies/login',301,{})
}
/*@http put method 
@access private
@url/movies/update-movies/:id
*/
let Update_movie=async(req,res)=>{
  try {
    let {
      movie_title,
      movie_duration,
      movie_language,
      movie_genre,
      movie_year,
      movie_certificate,
      movie_description,
      movie_audio_lang,
      movie_category,
    } = req.body;

    let movie_img = req.files[0];
    let movie_video = req.files[1];

    let payload={movie_title,
      movie_duration,
      movie_language,
      movie_genre,
      movie_year,
      movie_certificate,
      movie_description,
      movie_audio_lang,
      movie_category,
      movie_img,
      movie_video,}
    await  MovieSchema.updateOne({_id:req.params.id},{$set:payload})
    res.end("ok..............................updated");
  } catch (error) {
    console.log(error);
  }
}


/*@http delete method 
@access private
@url/movies/delete-movies/:id
*/
let DeleteMovie=async (req,res)=>{
  await MovieSchema.deleteOne({_id:req.params.id})
  res.redirect('/movies/all-movies')
}
module.exports={GetMovies,GetMovie,CreateMovie,GetMovieObj,SearchVideo,Search_filter,DeleteMovie,Update_movie,Update_movie_get,userRegister,GetUser,login_get,login_post,logout,profile,otppost}