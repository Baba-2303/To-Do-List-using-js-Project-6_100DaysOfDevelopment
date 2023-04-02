btn1 = document.getElementById('add');
btn1.addEventListener('click',getAndUpdate);
function getAndUpdate(){
    console.log("btn1 clicked")
    title = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    if(title!="" && desc!=""){
        if(localStorage.getItem('itemJson')==null){
            itemJsonArray = [];
            itemJsonArray.push([title,desc]);
            localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))
        }
        else{
            itemJsonArrayStr = localStorage.getItem('itemJson')
            itemJsonArray = JSON.parse(itemJsonArrayStr)
            itemJsonArray.push([title,desc]);
            localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))
        }
    }
    else{
        alert("title and description is compulsory!")
    }
    update();
}
function update(){
    
    if(localStorage.getItem('itemJson')==null){
        itemJsonArray = [];
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))
    }
    else{
        itemJsonArrayStr = localStorage.getItem('itemJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr)
    }
    
    // Populate the table
    let tbody = document.getElementById('tbody');
    let str = "";
    itemJsonArray.forEach((element,index) => {
        str += `
        <tr>
            <th scope="row">${index+1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button onclick="deleteItem(${index})" class="btn btn-primary btn-sm">Delete</button></td>
        </tr>`;
    });
    tbody.innerHTML = str;
}
update();

function deleteItem(itemIndex){
    //call the value of key"itemJson" form localstorage which is in a string format
    itemJsonArrayStr = localStorage.getItem('itemJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr)
    //delete item at called index
    itemJsonArray.splice(itemIndex,1);
    //store the object itemJson:"itemJsonArray" again in localStorage
    localStorage.setItem('itemJson', JSON.stringify(itemJsonArray))
    update();
}

btn2 = document.getElementById('clear');
btn2.addEventListener('click',()=>{
    if(confirm("do you really want to clear your list? \nNote: All data will be lost permanently")){
    console.log("cleaning the storage");
    localStorage.clear();
    update();
}
});


