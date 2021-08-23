'use strict';


let rightSection = document.getElementById('left_section');
let form = document.getElementById('form');
let clear = document.getElementById('clear');
let table = document.createElement('table');



if (localStorage.getItem('toDo') === null) {
    localStorage.setItem('toDo', JSON.stringify([]));
}

let toDoArr = JSON.parse(localStorage.getItem('toDo'));


function ToDoFun(name, pages, section) {

    this.name = name;
    this.pages = pages;
    this.section = section;

    this.likes = this.randlikes(1, 500);
    toDoArr.push(this);
    localStorage.setItem('toDo', JSON.stringify(toDoArr));

    console.log(toDoArr);

}


ToDoFun.prototype.randlikes = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};



form.addEventListener('submit', fHandler);

function fHandler(event) {
    event.preventDefault();

    let task = event.target.task.value;
    let page = event.target.page.value;
    let urgency = event.target.urgency.value;

    new ToDoFun(task, page, urgency);
    console.log(toDoArr);
    render();   


}

document.addEventListener('click', clearhand);
function clearhand (event){
   if(event.target.id=='clear'){
       localStorage.clear();
       rightSection.innerHTML=' ';
       toDoArr=[];

   }

}

function render(){
     
    rightSection.innerHTML = ' ';

    rightSection.append(table);

    let row = document.createElement('tr');
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    let th4 = document.createElement('th');
    let th5 = document.createElement('th');
    let th6 = document.createElement('th');


    th1.innerHTML = 'Book Name';
    th2.innerHTML = 'pages';
    th3.innerHTML = 'likes';
    th4.innerHTML = 'urgency';
    th5.innerHTML = 'ID';
    th6.innerHTML = 'remove';

    table.appendChild(row);

    row.appendChild(th1);
    row.appendChild(th2);
    row.appendChild(th3);
    row.appendChild(th4);
    row.appendChild(th5);
    row.appendChild(th6);

    for(let i = 0 ; i<toDoArr.length; i++){

        let rownew = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');
    
    
        td1.innerHTML = toDoArr[i].name;
        td2.innerHTML = toDoArr[i].pages;
        td3.innerHTML = toDoArr[i].likes;
        td4.innerHTML = toDoArr[i].section;
        td5.innerHTML = i+1;
        td6.innerHTML = 'remove';
    
        table.appendChild(rownew);
    
        rownew.appendChild(td1);
        rownew.appendChild(td2);
        rownew.appendChild(td3);
        rownew.appendChild(td4);
        rownew.appendChild(td5);
        rownew.appendChild(td6);

    }


}


table.addEventListener('click',removeitem);
function removeitem(event){
    event.preventDefault();
    let target = event.target.innerText
    if(target == 'remove'){ 
        let child = parseInt(event.target.parentElement.rowIndex) 
        event.target.parentElement.remove()
        toDoArr.splice(child,1)
           localStorage.toDos = JSON.stringify(toDoArr) 

           
    }

  }
render();