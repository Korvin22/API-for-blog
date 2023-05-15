# movies-explorer-api.
API для блога на Node.js. Приложение представляет собой страницу, на которой могут делать записи любые авторизованные пользователи.
Backend доступен по адресу: http://158.160.23.206/

Протестировать проект можно на учетных данных тестового пользователя http://158.160.23.206/signin:
      "password": "test",
      "email": "test@test.ru".

Для регистрации обязательным являются 3 поля: **name, email, password**.
Для создания поста поле **message** явзяется обязательным.

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Директории

`/controllers` - папка с контроллерами  
`/errors` - папка с видами ошибок  
`/middlewares` - папка с middlewares  
`/models` - папка с моделями БД  
`/routes` — папка с файлами роутера  

---

# Модели
## Модель пользователя 🙋🏻‍♂️

|  Название  |     Тип поля      |            Ограничения             |     Описание     |
| :--------: | :---------------: | :--------------------------------: | :--------------: |
|   `name`   |     `String`      |      От `2` до `30` символов       | Имя пользователя |
|  `email`   | `Email as String` | E-mail формата `example@email.com` | E-mail для входа |
| `password` |     `String`      |                 -                  | Пароль для входа |


## Модель записей блога
|   Название    |     Тип поля     |               Ограничения               |           Описание            |
| :-----------: | :--------------: | :-------------------------------------: | :---------------------------: |
|   `name`      |     `String`     |  От `2` до `30` символов                |      Имя пользователя         |
|  `CreatedAt`  |    `Date`        |                    —                    |           Дата создания       |
|  `message`    |     `String`     |                    —                    |         Длительность          |
|    `owner`    |    `ObjectId`    |                    —                    | Создатель БД-записи о записи  |


---

# Запросы к серверу 🛠
|        Путь        | Тип запроса |                  Ответ сервера                   |
| :----------------: | :---------: | :----------------------------------------------: |
|     `/users`       |    `GET`    |  Список пользователей                            |
|     `/users/me`    |    `PATCH`  |  Редактирование данных пользователя              |
|     `/posts`       |    `GET`    |  Список постов                                   |
|     `/posts`       |   `POST`    |   Создание **`собственной`** записи              |
|    `/posts/:id`    |  `DELETE`   |   Удаление **`собственной`** записи              |
|    `/posts/:id`    |  `PATCH`    |   Редактирование **`собственной`** записи        |
|     `/signup`      |   `POST`    |               Регистрация аккаунта               |
|     `/signin`      |   `POST`    |     Вход в аккаунт с помощью e-mail и пароля     |
  
## Применяемые технологии 

* Expressjs
* nodemon
* MongoDB
* mongoose
* express-paginate (использовалась для задания лимита пагинации согласно ТЗ)
* dotenv
* celebrate
* bcryptjs
* express-rate-limit
* winston
* express-winston
* jsonwebtoken
* validator
* eslint
