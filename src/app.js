import {http} from './http';
import {ui} from './ui';


document.addEventListener('DOMContentLoaded', getPosts); //прослушиваем  загрузку страницы, по завершению подгружаем данные
document.querySelector('.post-submit').addEventListener('click', submitPost); // отправка поста
document.querySelector('#posts').addEventListener('click', deletePost); //удаление поста
document.querySelector('#posts').addEventListener('click', enableEdit); //значек редактирования
document.querySelector('.card-form').addEventListener('click', cancelEdit); //значек редактирования


// Получаем список постов из JSON хранилища
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}


// Отправить  ПОСТ
function submitPost() {

  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }

  // Валидация на пустые поля
  if (title === '' || body === '') {
    ui.showAlert('Please fill in all fields', ' alert alert-danger');
  } else { 

    // Проверяем установлен ли ID
    if (id === '') {
      // СОЗДАТЬ ПОСТ
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert("Post added", 'alert alert-success');
          ui.clearField();
          getPosts();
        })
        .catch(err => console.log(err))
    } else {
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert("Post updated", 'alert alert-success');
          ui.changeFormState('add'); 
          getPosts();
        })
        .catch(err => console.log(err))
    }
  }
}

function deletePost(e) { // реагируем на событие
  if (e.target.parentElement.classList.contains('delete')) { 
    const id = e.target.parentElement.dataset.id;
    if (confirm("Are you sure?")) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert("post removed", 'alert alert-success');
          getPosts(); 
        })
        .catch(err => console.log(err));
    }
  }
  e.preventDefault()
}


// РЕДАКТИРОВАНИЕ
function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) { 
    const id = e.target.parentElement.dataset.id; 
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const data = { 
      id: id,  
      title,
      body
    }
    ui.fillForm(data); 
  }
  e.preventDefault();
}

function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
}
