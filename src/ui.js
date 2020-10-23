class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add'; //устанавливаем по умолчанию стату формы в Создать Новый
  }


  // Отображаем посты
  showPosts(posts) {
    let output = '';

    posts.forEach((post) => { //отрисовываем каждые пост в своем блоке
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
          </div>
        </div>
      `;
    });
    this.post.innerHTML = output;
  }

  // Показываем подсказку
  showAlert(message, className) {
    this.clearAlert();

    const div = document.createElement('div'); //создаем блок под сообщение
    div.className = className; //присоединяем к нему класс

    div.appendChild(document.createTextNode(message)); //вставляем внутрь блока сообщение
    const container = document.querySelector('.postsContainer'); //ищем родителя
    const posts = document.querySelector('#posts'); //ищем блок перед которым ставлять
    container.insertBefore(div, posts);

    // timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }


  // Очищаем форму подстказки
  clearAlert() {
    const currentAlert = document.querySelector('.alert'); //ищем блок с сообщением
    if (currentAlert) {
      currentAlert.remove(); //если он найден - удаляем
    }
  }

  // Очищаем опля ввода
  clearField() {
    this.titleInput.value = '';
    this.bodyInput.value = ''
  }

  // Заполняем форму при редактирвроваии
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id; //устанавлиаем ID - тем самы понимаем, что это не новый пост Без ID
    this.changeFormState('edit'); //меняем статус формы на Редактирование
  }


  clearIdInput(){ //очищаем ID  в скрытом поле
    this.idInput.value = '';
  }

// Меняем стиль формы
  changeFormState(type) {
    if (type === 'edit') {
      // Меняем текст и класс кнопки Submit
      this.postSubmit.textContent = "Update Post";
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      // Создаем кнопку редактирования
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));

      const cardForm = document.querySelector('.card-form'); //ищем родителя
      const formEnd = document.querySelector('.form-end'); //ищем блок перед которым надо вставить кнопку
      cardForm.insertBefore(button, formEnd);  //вставляем кнопку в форму перед элементом

    } else {
// Меняем текст и класс кнопки Submit на стандартную
      this.postSubmit.textContent = "Post it";
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';

      // Если есть кнопка то убираем ее
      if(document.querySelector('.post-cancel')){
        document.querySelector('.post-cancel').remove();
      }

      this.clearIdInput(); //удаляем ID из скрытого опля

      this.clearField(); //очищаем поля формы

    }
  }
}

export const ui = new UI();