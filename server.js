const express =require('express');
const {engine}=require('express-handlebars')
const {connect}=require('mongoose')
const {MONGODB_URL,MONGODB_CLOUD_URL,PORT}=require('./config/index')
const app=express()
const GetMovies=require('./routes/movie')
const Handlebars=require('handlebars');
const methodOverride=require('method-override');
const flash=require('connect-flash')
const session=require('express-session')
const passport=require('passport')
const fasttwosms=require('fast-two-sms');

require('./middlewares/passport')(passport)


app.use(express.urlencoded({extended:true}))

//flash middleware section
app.use(session({
    secret:'arun',
    resave:true,
    saveUninitialized:true
}))

app.use(flash());
app.use(function(req,res,next){
    res.locals.success_message=req.flash('success_message');
    res.locals.error_message=req.flash('error_message');
    res.locals.info_message=req.flash('info_message');
    res.locals.error = req.flash("error")
    res.locals.user=req.user || null;
    next()
})
//middleware section starts here

app.use(express.static(__dirname+'/public'));
app.engine('handlebars',engine())
app.set('view engine','handlebars')
//method override
app.use(methodOverride('_method'))
//passport local
app.use(passport.initialize());
app.use(passport.session())
//middleware section ends here

//trim fun
Handlebars.registerHelper('trimstring',(str)=>{
    let string=[...str].splice(6).join('')
    return new Handlebars.SafeString(string)
})
//routes section starts here
app.get('/',(req,res)=>{
    res.render('home')
})
//routes section ends here
//mount section starts here
app.use('/movies',GetMovies)

//mount section ends here






//node js server starts here
let startserver=async ()=>{
try {
  
    if(process.env.NODE_ENV==='development'){
         //db connection
          await connect(MONGODB_URL)
          console.log('mongodb connected');
    }
    if(process.env.NODE_ENV==='production'){
        await connect(MONGODB_CLOUD_URL)
        console.log('mongodb cloud connected')   
    }
     app.listen(PORT ,(err)=>{
    if(err) throw err;
    console.log(`server listen port no ${PORT}`);
 })
    
} catch (error) {
    console.log(error);
}
}
startserver()