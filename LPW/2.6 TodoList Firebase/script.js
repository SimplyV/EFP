import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyBoBiqaa6aAlZsgvuK5sgkE5W9-UvLk9k8",
  authDomain: "golden-book-a28ba.firebaseapp.com",
  projectId: "golden-book-a28ba",
  storageBucket: "golden-book-a28ba.appspot.com",
  messagingSenderId: "30283866551",
  appId: "1:30283866551:web:b5b627446728fd15fe4832"

}
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const listContainer = document.querySelector('.tasks');
const writeList = function (item) {

  const deleteTask = async function (id, element) {
    try {
      await deleteDoc(doc(collection(db, "tasks"), id));
      element.remove();
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  }

  const updateTask = async function (id, val, status, element) {
    const updateRef = doc(collection(db, "tasks"), id);
    try {
      await updateDoc(updateRef, {
        value: val,
        isCompleted: status
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  let checked;
  let isDisabled;
  let a = document.createElement('div')
  a.classList.add('task');
  if (item.isCompleted == 'true') {
    a.classList.add('completed');
    checked = 'checked';
    isDisabled = 'disabled'
  };
  a.setAttribute('data-id', item.id);
  let status = (item.isCompleted) ? 'true' : 'false';
  a.setAttribute('status', status);

  let html = `
          <div class="task-header">
            <label class="container">
              <input type="checkbox" class="check-task" checked=${checked}>
              <span class="checkmark"></span>
            </label>
            <span class="task-value">${item.value} </span>
            <div class="task-edit-container">
              <input type="text" id="edit-val" value="${item.value}">
              <button class="remove-edit-btn"><i class="fa-solid fa-xmark"></i></button>
              <button class="validate-edit-btn"><i class="fa-solid fa-check"></i></button>
            </div>
          </div>
          <div class="task-actions">
            <button class="edit-btn" ${isDisabled}><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="remove-btn" data-id="${item.id}" ><i class="fa-solid fa-trash"></i></button>
          </div>`
  a.innerHTML = html
  listContainer.appendChild(a)

  // Delete a task 
  a.querySelector('.remove-btn').addEventListener('click', function () {
    deleteTask(item.id, a);
  });

  // Show the input for editing the task
  a.querySelector('.edit-btn').addEventListener('click', function () {
    a.querySelector('.task-edit-container').classList.add('open');
    a.querySelector('.task-header .task-value').style.display = "none";
    a.querySelector('.edit-btn').setAttribute('disabled', '');
    a.querySelector('.task-header .check-task').setAttribute('disabled', '');
    a.querySelector('.task-header .checkmark').style.opacity = '.4';
  });

  // Hide the input for editing task
  a.querySelector('.remove-edit-btn').addEventListener('click', function () {
    if (a.querySelector('.task-edit-container input').value != item.value) {
      a.querySelector('.task-edit-container input').value = '';
    }
    a.querySelector('.task-edit-container').classList.remove('open');
    a.querySelector('.task-header .task-value').style.display = "block";
    a.querySelector('.edit-btn').removeAttribute('disabled');
    a.querySelector('.task-header .check-task').removeAttribute('disabled');
    a.querySelector('.task-header .checkmark').style.opacity = '1';
  });

  // Validate the task and send informations to database 
  a.querySelector('.validate-edit-btn').addEventListener('click', function () {
    let value = a.querySelector('.task-edit-container input').value;
    let status = a.getAttribute('status');
    if (a.querySelector('.task-edit-container input').value != value) {
      a.querySelector('.task-edit-container input').value = '';
    } else {
      a.querySelector('.task-edit-container').classList.remove('open');
      a.querySelector('.task-header .task-value').style.display = "block";
      a.querySelector('.edit-btn').removeAttribute('disabled');
      a.querySelector('.task-header .check-task').removeAttribute('disabled');
      a.querySelector('.task-header .checkmark').style.opacity = '1';
      return;
    }
    let update = updateTask(item.id, value, status, a);
    if (update) {
      a.querySelector('.task-header .task-value').innerHTML = value;
    }
    if (a.querySelector('.task-edit-container input').value != value) {
      a.querySelector('.task-edit-container input').value = '';
    }
    a.querySelector('.task-edit-container').classList.remove('open');
    a.querySelector('.task-header .task-value').style.display = "block";
    a.querySelector('.edit-btn').removeAttribute('disabled');
    a.querySelector('.task-header .check-task').removeAttribute('disabled');
    a.querySelector('.task-header .checkmark').style.opacity = '1';
  })

  // Update status of the task
  a.querySelector('.task-header .check-task').addEventListener('click', function () {
    let newStatus;
    let status = a.getAttribute('status');
    if (status == 'true') {
      newStatus = false;
      a.setAttribute('status', newStatus);
      a.classList.remove('completed');
      a.querySelector('.edit-btn').removeAttribute('disabled');
    } else {
      newStatus = true;
      a.setAttribute('status', newStatus);
      a.classList.add('completed');
      a.querySelector('.edit-btn').setAttribute('disabled', '');
    }

    let value = a.querySelector('.task-value').innerHTML;
    let update = updateTask(item.id, value, newStatus, a);
  })
}

const submitContent = document.getElementById('add-task');
submitContent.addEventListener('click', async (e) => {
  e.preventDefault();
  const value = document.getElementById('task-value').value;
  const isCompleted = false;
  const payload = Object.assign({}, {
    value: value,
    isCompleted: isCompleted
  });

  try {
    const docRef = await addDoc(collection(db, "tasks"), payload);
    const userName = document.getElementById('task-value').value = '';
    console.log("Document written with ID: ", docRef.id);
    const newItem = Object.assign({
      id: docRef.id
    }, payload);
    writeList(newItem);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

const querySnapshot = await getDocs(collection(db, "tasks"));
querySnapshot.forEach((doc) => {
  const item = Object.assign({
    id: doc.id,
  }, doc.data());
  writeList(item);
});