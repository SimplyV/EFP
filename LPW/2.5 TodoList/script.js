// Variables

let tasksList = [];
const button = document.querySelector('#add-task');
const taskArea = document.querySelector('.tasks');
const form = document.querySelector('.form');
const input = document.querySelector('#task-value');

displayTasks();
form.addEventListener('submit', function(e){
  e.preventDefault();

  var tasks = getFromLocalStorage('todos');
  var taskL = JSON.parse(tasks);  
  var idTask;
  if(tasks){
    idTask = taskL.length;
  }
  else{
    idTask = 0;
  }

  var text = input.value;

  var element = document.createElement('div');
  element.classList.add('task');
  element.setAttribute('data-id', idTask);
  taskArea.appendChild(element);

  var elementHeader = document.createElement('div');
  elementHeader.classList.add('task-header');
  element.appendChild(elementHeader);

  var elementHeaderText = document.createElement('span');
  elementHeaderText.textContent = text;
  elementHeader.appendChild(elementHeaderText);

  var elementActions = document.createElement('div');
  elementActions.classList.add('task-actions');
  element.appendChild(elementActions);

  var elementActionEditButton = document.createElement('button');
  elementActionEditButton.classList.add('edit-btn');
  elementActions.appendChild(elementActionEditButton);

  var elementActionEdit = document.createElement('i');
  elementActionEdit.classList.add('fa-regular');
  elementActionEdit.classList.add('fa-pen-to-square');
  elementActionEditButton.appendChild(elementActionEdit);

  var elementActionDeleteButton = document.createElement('button');
  elementActionDeleteButton.classList.add('remove-btn');
  elementActionDeleteButton.setAttribute('onclick', 'deleteTask()');
  elementActions.appendChild(elementActionDeleteButton);

  var elementActionDelete = document.createElement('i');
  elementActionDelete.classList.add('fa-solid');
  elementActionDelete.classList.add('fa-trash');
  elementActionDeleteButton.appendChild(elementActionDelete);

  let task = {
    id: idTask,
    value: text,
    isCompleted: false
  };

  tasksList.push(task);
  addToLocalStorage(tasksList)
  input.value = "";
  
});

function displayTasks(){
  var tasks = getFromLocalStorage('todos');
  if(tasks){
    tasksList = JSON.parse(tasks);

    for(const tasks of tasksList){
      // console.log(tasks.isCompleted);

      var element = document.createElement('div');
      element.classList.add('task');
      taskArea.appendChild(element);
    
      var elementHeader = document.createElement('div');
      elementHeader.classList.add('task-header');
      element.appendChild(elementHeader);
    
      var elementHeaderText = document.createElement('span');
      elementHeaderText.textContent = tasks.value;
      elementHeader.appendChild(elementHeaderText);
    
      var elementActions = document.createElement('div');
      elementActions.classList.add('task-actions');
      element.appendChild(elementActions);
    
      var elementActionEditButton = document.createElement('button');
      elementActionEditButton.classList.add('edit-btn');
      elementActions.appendChild(elementActionEditButton);
    
      var elementActionEdit = document.createElement('i');
      elementActionEdit.classList.add('fa-regular');
      elementActionEdit.classList.add('fa-pen-to-square');
      elementActionEditButton.appendChild(elementActionEdit);
    
      var elementActionDeleteButton = document.createElement('button');
      elementActionDeleteButton.classList.add('remove-btn');
      elementActionDeleteButton.setAttribute('onclick', 'removeFromLocalStorage('+tasks.id+')');
      elementActions.appendChild(elementActionDeleteButton);
    
      var elementActionDelete = document.createElement('i');
      elementActionDelete.classList.add('fa-solid');
      elementActionDelete.classList.add('fa-trash');
      elementActionDeleteButton.appendChild(elementActionDelete);

    }
  }
}

function addToLocalStorage(value){
  localStorage.setItem('todos', JSON.stringify(value));
}

function getFromLocalStorage(id){
  s = localStorage.getItem(id);
  return s;
}

function removeFromLocalStorage(id){
  // localStorage.removeItem(id);
  var s = document.querySelector('.task[data-id="'+id+'"]');
  console.log(s);
}

