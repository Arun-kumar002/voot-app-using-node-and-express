
//listener of video
let video_form=document.querySelector('#video_form');
let video_section=document.querySelector('#video_section')
let full_deatils_section=document.querySelector('#full_deatils_section')
let X_button=document.querySelector('#X_button')
let video_ind_tag=document.querySelector('#video_ind_tag');
video_form.onclick=function(){

        full_deatils_section.style.display='none';
        video_section.style.display='block';
        video_ind_tag.play()
}
X_button.onclick=function(){
    full_deatils_section.style.display='block';
    video_section.style.display='none';
    window.location.reload()
    video_ind_tag.pause()

}
//history obj
let add_movie_btn=document.querySelector('#add_movie_btn');

add_movie_btn.onclick=function(){
    console.log('work')
    window.history.go(-2)
}
   
