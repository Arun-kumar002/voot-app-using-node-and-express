let alert=document.querySelector('.alert');
let error_msg_remove=document.querySelector('#error_msg_remove')

setTimeout(() => {
    alert.style.transform='translateX(-500px)';
    alert.style.transition='ease all 2s';
    error_msg_remove.innerHTML='';
}, 5000)
{
    alert.style.transform='translateX(0px)';
    alert.style.transition='ease all 0.7s';
}
