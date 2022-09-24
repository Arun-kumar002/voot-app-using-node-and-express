//search icon
let Search_Icon=document.querySelector('#Search_Icon');
let search_btn=document.querySelector('#search_btn')
let MenuBlock=document.querySelector('.MenuBlock');

Search_Icon.addEventListener('click',e=>{
    e.preventDefault()
    MenuBlock.innerHTML=`<form action='/movies/search-movies' method='post' id='search_form_dom'>
    <input type='text' name='movie_title' placeholder='Enter movie Name'>
    <button id='search_btn'>search</button>
    </form>
    `
})

//carusal part start here
let carusal_right=document.querySelector('.carusal_right')
let carusal_left=document.querySelector('.carusal_left')
let filter_section_carusal=document.querySelector('#filter_section')
console.log(carusal_right)
carusal_right.onclick=function(){
    filter_section_carusal.style.transform='translateX(-35%)'
    carusal_left.style.display='block'
    carusal_right.style.display='none'
    filter_section_carusal.style.transition='ease all 7s'

}

carusal_left.onclick=function(){
    filter_section_carusal.style.transform='translateX(0%)'
    carusal_left.style.display='none'
    carusal_right.style.display='block'
    filter_section_carusal.style.transition='ease all 7s'
}