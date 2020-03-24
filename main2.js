const removeIcon = '<i class="fas fa-trash-alt"></i>';
const completedIcon = '<i class="far fa-check-circle"></i>';
const input = document.querySelector('.header-input');


//------LOCAL STORAGE---------------

const tasks = (localStorage.getItem('toDoList')) ? JSON.parse(localStorage.getItem('toDoList')) : {
    todo: [],
    completed: []
}

//-----LISTENERS EVENTS-------------




const updateLocalStorage = () => {
    localStorage.setItem('toDoList', JSON.stringify(tasks));

}





//-----DOM MANIPULATING-----------


const remove = (e) => {
    const liItem = e.target.parentNode.parentNode.parentNode;
    const ul = liItem.parentNode;
    const ulID = ul.id;
    const value = liItem.innerText;

    if (ulID === 'todo') {
        tasks.todo.splice(tasks.todo.indexOf(value), 1);
    } else {
        tasks.completed.splice(tasks.completed.indexOf(value), 1);
    }


    ul.removeChild(liItem)

    updateLocalStorage();


}

const completed = (e) => {
    const liItem = e.target.parentNode.parentNode.parentNode;
    const ul = liItem.parentNode;
    const ulID = ul.id;
    const value = liItem.innerText;



    if (ulID === 'todo') {
        tasks.todo.splice(tasks.todo.indexOf(value), 1);
        tasks.completed.push(value);
    } else {
        tasks.completed.splice(tasks.completed.indexOf(value), 1);
        tasks.todo.push(value);
    }

    const target = (ulID === 'todo') ? document.querySelector('#completed') : document.querySelector('#todo');


    ul.removeChild(liItem)
    target.appendChild(liItem)
    updateLocalStorage();

}


addTaskToDOM = (taskTitle, complete) => {
    const ul = (complete) ? document.querySelector('#completed') : document.querySelector('#todo');

    //item niech bedzie tekstem tasku
    const task = document.createElement('li');
    task.classList.add('todo-li');

    const span = document.createElement('span');
    span.classList.add('taskTitleSpan');
    span.innerText = taskTitle;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove');
    removeBtn.innerHTML = removeIcon;
    removeBtn.addEventListener('click', remove);

    const completedBtn = document.createElement('button');
    completedBtn.classList.add('remove');
    completedBtn.innerHTML = completedIcon;
    completedBtn.addEventListener('click', completed);


    buttonsDiv.appendChild(removeBtn);
    buttonsDiv.appendChild(completedBtn);
    task.appendChild(span);
    task.appendChild(buttonsDiv);


    ul.appendChild(task);

}





const addTask = (inputValue) => {

    if (!inputValue) return;
    addTaskToDOM(inputValue);


    tasks.todo.push(inputValue);
    updateLocalStorage();
    input.value = '';
}


//-------LISTENERS EVENTS-----------------

document.querySelector('.header-btn').addEventListener('click', (e) => {



    const inputValue = input.value;
    addTask(inputValue);
});


input.addEventListener('keydown', (e) => {

    const inputValue = input.value;

    if (e.keyCode === 13 && e.target.value) {
        addTask(inputValue);
    }

})

//----------RENDER LIST FROM LOCALSTORAGE-----------------------------


const renderToDoList = () => {
    if (!tasks.todo.length && !tasks.completed.length) return;

    for (let i = 0; i < tasks.todo.length; i++) {
        const taskName = tasks.todo[i];
        addTaskToDOM(taskName, false)
    }

    for (let j = 0; j < tasks.completed.length; j++) {
        const taskName = tasks.completed[j];
        addTaskToDOM(taskName, true)
    }
}

renderToDoList()



//----------- SEARCHING FEATURE ------------------------------------
const search = document.querySelector('.search');
const ulToDo = document.querySelector('#todo');
const ulCompleted = document.querySelector('#completed');


const searching = (e) => {
    searchTaskTitle = e.target.value.toLowerCase();

    let todoTasks = tasks.todo;
    let completedTasks = tasks.completed;


    todoTasks = todoTasks.filter(task => task.toLowerCase().includes(searchTaskTitle))
    completedTasks = completedTasks.filter(task => task.toLowerCase().includes(searchTaskTitle))


    ulToDo.textContent = '';
    ulCompleted.textContent = '';

    todoTasks.forEach(li => addTaskToDOM(li, false))
    completedTasks.forEach(li => addTaskToDOM(li, true))

}


search.addEventListener('input', searching)