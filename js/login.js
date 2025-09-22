let userEmail=document.querySelector('#userEmail')
let userPassword=document.querySelector('#userPassword')
let loginBtn=document.querySelector('#loginBtn')
let alertContainer = document.querySelector(".alertContainer")
let alertItem = document.querySelector(".alertItem")
let alertMsg = document.querySelector("#alertMsg")
let closeBtn = document.querySelector("#close")
let userList=[];

if(localStorage.getItem('usersList')){
    userList=JSON.parse(localStorage.getItem('usersList'))
}
console.log(userList);

loginBtn.addEventListener('click',login)
closeBtn.addEventListener('click',close)
alertContainer.addEventListener('click',close)
alertItem.addEventListener('click',function(e){
    e.stopPropagation()
})
userEmail.addEventListener('input',validateEmail)
userPassword.addEventListener('input',validatePassword)

function login(){
    let islogged=false
    if(isEmpty()!=true){
        for(let i = 0; i<userList.length;i++){
            if(userEmail.value==userList[i].email && userPassword.value==userList[i].password){
                islogged=true
                Toastify({
                
                text: "You are Logged in Successfully",
            
                duration: 2000
            
                }).showToast();
                localStorage.setItem('loggedEmail',userList[i].email)
                setTimeout(() => {
                    window.location.replace('../Home.html')
                }, 2100);
            }
        }
        if(islogged==false){
            viewError('email or password not correct')
        }
    }
}

function isEmpty(){
    if(userEmail.value=='' || userPassword.value==''){
        viewError('All inputs are required')
        return true
    }
}
function viewError(message){
    alertContainer.classList.replace('d-none','d-block')
    alertMsg.innerHTML=message
}

function close(){
    alertContainer.classList.replace('d-block','d-none')
}

function validateEmail(){
    let regex=/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    var text=userEmail.value
    if(regex.test(text))
    {
        userEmail.classList.add('is-valid')
        userEmail.classList.remove('is-invalid')
        return true
    }else{
        userEmail.classList.add('is-invalid')
    }
}
function validatePassword(){
    let regex=/^[a-z][a-zA-Z0-9]{5,15}$/
    var text=userPassword.value
    if(regex.test(text))
    {
        userPassword.classList.add('is-valid')
        userPassword.classList.remove('is-invalid')
        return true
    }else{
        userPassword.classList.add('is-invalid')
    }
}