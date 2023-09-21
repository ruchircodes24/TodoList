let todoList=JSON.parse(localStorage.getItem('todoList'))||[{
    name: 'eat',
    dueDate:'2023-06-01'
    },
    {
       name: 'sleep',
       dueDate: '2023-06-02'
    }];

renderTodoList();

function renderTodoList(){//render means to display something on page
    let todoListHtml='';
    todoList.forEach((todoObject) => {
        const {name, dueDate} = todoObject;
        const html=`
            <div>${name}</div>
            <div>${dueDate}</div>
            <button class="delete-todo js-delete-todo-button">
            Delete</button>
           `;//generating the html
        todoListHtml+=html;
    }) 
    document.querySelector('.js-todo-list').innerHTML= `${todoListHtml}`;

    //.forEach method is used to loop through the array.
    //querySelectorAll is used to select all the delete seperately
    document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () =>{
            todoList.splice(index, 1);
            saveToStorage();
            renderTodoList();
        })
    })
}

document.querySelector('.js-add-todo').addEventListener('click', () =>{
    addTodo();
})

//function to push a new value to the array
function addTodo(){
    let inputElement=document.querySelector('.js-input-todo');
    let dateInputElement= document.querySelector('.js-input-date');
    
    let name = String((inputElement.value));
    dueDate= dateInputElement.value;
    todoList.push({
        //name: name,
        //dueDate: dueDate

        name, dueDate //shortcut for above two lines(shorthand property syntax)
    });
    renderTodoList();
    saveToStorage();
    inputElement.value='';
    dateInputElement.value='';
}

function saveToStorage(){ 
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function checkKey(event){
    if(event.key==='Enter'){  
        addTodo();
    }
}