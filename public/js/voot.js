// let MenuBlock=document.querySelector('.MenuBlock');

// MenuBlock.addEventListener('click',e=>{
//     e.preventDefault()
//     if(e.target){
//         e.target.style.opacity='1.5';
//         e.target.style.color='#fff'
//         e.target.style.borderTop='2px solid #7f0dff';
//         e.target.style.paddingTop="15px"   
//     }
//     c+=1

// });

// let slider_container=document.querySelector('#slider');
let left_slider=document.querySelector('.left_slider');
let Right_slider=document.querySelector('.Right_slider')
let images=document.querySelector('#slider')
let c=1;
let d=1
left_slider.onclick=function(){
    c+=1
    let d=c*140
    images.style.transform=`translateX(-${d}%)`
    console.log('work');
}
Right_slider.onclick=function(){
    d+=1
    let e=d*140
    images.style.transform=`translateX(-${e}%)`
    console.log('work');
   
}



   
   

let label_slider=document.querySelector('.label_slider');
label_slider.addEventListener('click',e=>{
   if(e.target.classList.contains('img1')){
    images.style.transform='translateX(-280%)'
   }
   else if(e.target.classList.contains('img2')){
    images.style.transform='translateX(-420%)'
   }
   else if(e.target.classList.contains('img3')){
    images.style.transform='translateX(-560%)'
   }
   else if(e.target.classList.contains('img4')){
    images.style.transform='translateX(-420%)'
   }
   else if(e.target.classList.contains('img5')){
    images.style.transform='translateX(-280%)'
   }
})









