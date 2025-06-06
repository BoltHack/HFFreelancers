# Подробное описание

HFFreelancers — это удобная платформа, где пользователи могут скачивать веб-сайты, ставить лайки, оставлять отзывы и добавлять проекты в избранное. Также пользователи могут заказать свой сайт напрямую у разработчиков и воспользоваться широкими функциями личного кабинета. 

Проект поддерживает две локализации — английскую и русскую, что делает его доступным для широкой аудитории. Также реализована система авторизации, личного кабинета и админ-панели.

---

## Инструкция по запуску кода

### 1. Скачивание и распаковка
- Скачайте zip-архив с проектом.
- Распакуйте его в удобное для вас место.
- Откройте проект в редакторе кода (например, Visual Studio Code).

---

### 2. Настройка файла `.env`
Создайте файл `.env` в корневой папке проекта и добавьте в него следующие переменные окружения:

`env`:
```
MONGODB_URL=Ваша строка подключения к базе данных MongoDB.
JWTSecret=Это токен безопасности. Можете вводить тут любые символы. Например: kkgjdhfgdfkgbhdfbgdfhg156g46fg
refreshTokenSecret=Это токен безопасности. Можете вводить тут любые символы. Например: hlndfghfdh5gf5h65gitgfh+65gf6h1gf65gf1f4gh1gf1h981gf91gf98h1gf98h1g56fg6h1fg
USER=Электронная почта, которая будет использоваться для отправки кодов восстановления аккаунтов пользователям.
PASS=Пароль приложения для указанного адреса электронной почты.
```
---

# 3. Настройка переменных окружения и запуск проекта

Как получить `PASS`:

1. Перейдите в **[Управление аккаунтом Google](https://myaccount.google.com/)**.
2. Перейдите в раздел **"Безопасность"**.
3. Включите **двухфакторную аутентификацию**.
4. В меню **[Управление аккаунтом Google](https://myaccount.google.com/)** найдите и откройте раздел **"Пароли приложений"** (можно использовать поиск, если не получится найти).
5. Создайте новый пароль приложения:
    - Укажите любое название приложения, например: `hffreelancers`.
6. Скопируйте сгенерированный пароль и вставьте его в файл `.env` в значение переменной `PASS` (без пробелов).

Ваш файл `.env` должен выглядеть примерно следующим образом:
```
MONGODB_URL=mongodb://admin:mySecurePassword@localhost:27017/myDatabase?retryWrites=true&w=majority
JWTSecret=kkgjdhfgdfkgbhdfbgdfhg156g46fg
refreshTokenSecret=hlndfghfdh5gf5h65gitgfh+65gf6h1gf65gf1f4gh1gf1h981gf91gf98h1gf98h1g56fg6h1fg
USER='test@gmail.com'
PASS='lknghiutynoliunf'
```

---

## 4. Установка зависимостей и запуск проекта:

1. Установка nodemon:
     - В терминале, находясь в корневой папке проекта, выполните команду: npm install nodemon

2. Запуск проекта:
    - После успешной установки всех зависимостей запустите проект командой: npm start

3. Проверка работы:
     - Откройте ваш браузер. Перейдите по адресу: http://localhost:3000 или, если вы изменили адрес в app.js, переходите по выбранному адресу.

5. Перед началом работы убедитесь, что у вас установлено следующее:
    - Node.js (https://nodejs.org). Рекомендуется версия 16 или выше.
    - MongoDB (https://www.mongodb.com), чтобы подключиться к базе данных.

6. Если возникают ошибки подключения к MongoDB:
    - Убедитесь, что переменная MONGODB_URL в `.env` указана корректно.
    - Проверьте доступ к вашей базе данных.

7. Если вы используете почтовый сервис, отличный от Google:
    - Настройка для получения пароля приложения может отличаться.
    - Обратитесь к документации вашего почтового провайдера для получения дополнительной информации.

---

## 5. Как назначить себе роль администратора:

1. Откройте вашу базу данных MongoDB. Вы можете использовать MongoDB Compass или подключиться через терминал.

2. Перейдите в коллекцию users (или аналогичную, если у вас другое имя).

3. Найдите документ, соответствующий вашему пользователю. Обычно поиск осуществляется по email, например:
```
{

  "email": "yourEmail@example.com"

}
```

4. Отредактируйте поле `role` и измените его значение с "User" на "Admin". Пример:
```
{

  "role": "Admin",

}
```

5. Сохраните изменения.

6. После этого заново авторизуйтесь, зайдите в личный кабинет и у вас будут права администратора и доступ к админ-панели.

В английской версии:

![Снимок экрана 2025-05-12 145007](https://github.com/user-attachments/assets/52085976-4a45-4e55-ae8b-4fe6dd513e16)

В русской версии:

![Снимок экрана 2025-05-12 144510](https://github.com/user-attachments/assets/171a3fb3-34d7-4433-8b14-ff4161b5c908)
