class EasyHTTP {
  // make  HTTP GET

  // Отправка запроса на удаленный сервер
  async get(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }


// Отправка данных на удаленный сервер
  async post(url,data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    });
    const resData = await response.json();
    return resData;
  }


  // Обновление данных на сервере
  async put(url,data) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    });
    const resData = await response.json();
    return resData;
  }

  // Удаление данных на сервере
  async delete(url) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {'Content-type': 'application/json'},
    });
    const resData = await 'Resorse delete';
    return resData;
  }
}

export const  http = new EasyHTTP(); //создаем новый объект данного класса и экспортируем его во внешнюю среду