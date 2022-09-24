const{Schema,model}=require('mongoose')

const MovieSchema=new Schema({
    movie_title:{
        type:String,
      
    },
    movie_duration:{
         type:String,
       
    },
    movie_language:{
         type:String,
      
    },
    movie_genre:{
         type:String,
    
    },
    movie_year:{
         type:String,
       
    },
    movie_certificate:{
         type:String,
     
    },
    movie_description:{
         type:String,
     
    },
    movie_audio_lang:{
         type:String,
     
    },
    movie_img:{
         type:[''],
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs8Qc3JQWjYZ1Moimi0xMVLbBrqS2DYvhnzA&usqp=CAU'
    },
    movie_video:{
         type:[''],
 
    },
    movie_category:{
         type:String,
     
    },
},{timestamps:true});


module.exports=model('movies',MovieSchema)