const express=require('express')
const multer=require('multer')

const router=express.Router()
const {GetMovies,GetMovie,CreateMovie,GetMovieObj,SearchVideo,Search_filter,DeleteMovie,Update_movie,Update_movie_get,userRegister,GetUser,login_post,login_get,logout,profile,otppost}=require('../controller/movieController')
const storage=require('../config/multer');
const { prependListener } = require('../Model/Movie');
const {ensureAuthenticated}=require('../helpers/movie_helper')
let upload=multer({storage})


router.route('/search-movies').get(SearchVideo)
router.route('/create-movies').get(GetMovie)
router.route('/register').get(userRegister)
router.route('/register').post(GetUser)
router.route('/login').get(login_get)
router.route('/login').post(login_post)
router.route('/otp').post(otppost);



router.get('/logout',logout)
router.get('/profile',ensureAuthenticated,profile)

router.post('/create-movies',upload.any(['movie_img','movie_video']),CreateMovie)
router.post('/search-movies',Search_filter)

//allmovies
router.get('/all-movies',GetMovieObj)
router.get('/update/:id',Update_movie_get)
router.put('/update/:id',upload.any(['movie_img','movie_video']),Update_movie)
router.delete('/delete/:id',DeleteMovie)
router.route('/:id').get(GetMovies)


//search video


module.exports=router;