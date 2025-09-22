let userName = document.querySelector("#userName")
let userEmail = document.querySelector("#userEmail")
let userPassword = document.querySelector("#userPassword")
let registerBtn = document.querySelector("#registerBtn")
let alertContainer = document.querySelector(".alertContainer")
let alertItem = document.querySelector(".alertItem")
let closeBtn = document.querySelector("#close")
let alertMsg = document.querySelector("#alertMsg")
let form = document.querySelector("form")

let userList=[];
if(localStorage.getItem('usersList')){
    userList=JSON.parse(localStorage.getItem('usersList'))
}

registerBtn.addEventListener('click',register)
closeBtn.addEventListener('click',close)
alertContainer.addEventListener('click',close)
alertItem.addEventListener('click',function(e){
    e.stopPropagation()
})
userEmail.addEventListener('input',validateEmail)
userPassword.addEventListener('input',validatePassword)

function register(e){
    e.preventDefault();
    if (isEmpty()!=true){
        if(validateEmail()==true && validatePassword()==true){
            if(isExist!=true){
                let user={
                    name:userName.value,
                    email:userEmail.value,
                    password:userPassword.value
                }
            
                userList.push(user)
                localStorage.setItem('usersList',JSON.stringify(userList))
                Toastify({
            
                text: "Account Created Successfully",
            
                duration: 2000
            
                }).showToast();
                setTimeout(() => {
                    window.location.replace('../index.html')
                }, 2100);
            }else{
                viewError('Account Already Exist')
            }

        }
    }
}
function isEmpty(){
    if(userName.value=='' || userEmail.value=='' || userPassword.value==''){
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

function isExist(){
    for( let i=0;i<userList.length;i++){
        if(userEmail.value==userList[i].email){
            return true
        }
    }
}



