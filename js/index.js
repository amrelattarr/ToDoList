let itemName = document.querySelector('#itemName')
let searchInput = document.querySelector('#searchInput')
let addBtn = document.querySelector('#addBtn')
let updateBtn = document.querySelector('#updateBtn')
let alertContainer = document.querySelector('.alertContainer')
let alertMsg = document.querySelector("#alertMsg")
let alertItem = document.querySelector('.alertItem')
let closeBtn = document.querySelector('#close')
let loggedEmail = localStorage.getItem('loggedEmail')
var itemList=[]
let updateItem

if(localStorage.getItem('itemsList')){
    itemList=JSON.parse(localStorage.getItem('itemsList'))
}

addBtn.addEventListener('click',addNote)
updateBtn.addEventListener('click',update)
closeBtn.addEventListener('click',close)
alertContainer.addEventListener('click',close)
alertItem.addEventListener('click',function(e){
    e.stopPropagation()
})
document.querySelector('#searchInput').addEventListener('input', searchItems);

display()
function addNote(){
    if(isEmpty()!=true){
        var item={
            name:itemName.value,
            email:loggedEmail
        }
        itemList.push(item);
        localStorage.setItem('itemsList',JSON.stringify(itemList))
        display()
        itemName.value=''
        Toastify({
                
            text: "The Item is added Successfully",
        
            duration: 2000
        
            }).showToast();
    }
}
function display(){
    container=``

    for(let i = 0 ;i<itemList.length;i++){
        if(loggedEmail==itemList[i].email){
            container+=`
            <tr>
                <td>${i+1}</td>
                <td>${itemList[i].name}</td>
                <td><button onclick="remove(${i})" class="btn btn-danger">Delete</button></td>
                <td><button onclick="handleUpdate(${i})" class="btn btn-warning">Update</button></td>
            </tr>
            `
        }
    }

    document.querySelector('#data').innerHTML=container
}
function remove(index){
    itemList.splice(index,1)
    localStorage.setItem('itemsList',JSON.stringify(itemList))
    display()
    Toastify({
                
        text: "The Item is Deleted Successfully",
    
        duration: 2000
    
        }).showToast();
}
function handleUpdate(index){
    updateItem=index
    itemName.value=itemList[index].name
    addBtn.classList.replace('d-block','d-none')
    updateBtn.classList.replace('d-none','d-block')
}
function update(){
    itemList[updateItem].name=itemName.value
    localStorage.setItem('itemsList',JSON.stringify(itemList))
    display()
    addBtn.classList.replace('d-none','d-block')
    updateBtn.classList.replace('d-block','d-none')
    itemName.value=''
    Toastify({
                
        text: "The Item is updated Successfully",
    
        duration: 2000
    
        }).showToast();
}
function isEmpty(){
    if(itemName.value==''){
        viewError('Please add any Note')
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
function searchItems() {
    const searchTerm = document.querySelector('#searchInput').value.toLowerCase();
    let container = ``;

    for (let i = 0; i < itemList.length; i++) {
        if (
            loggedEmail === itemList[i].email &&
            itemList[i].name.toLowerCase().includes(searchTerm)
        ) {
            container += `
            <tr>
                <td>${i + 1}</td>
                <td>${itemList[i].name}</td>
                <td><button onclick="remove(${i})" class="btn btn-danger">Delete</button></td>
                <td><button onclick="handleUpdate(${i})" class="btn btn-warning">Update</button></td>
            </tr>
            `;
        }
    }

    document.querySelector('#data').innerHTML = container;
}
