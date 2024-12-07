# HFFreelancers

## Инструкция по запуску кода

### 1. Скачивание и распаковка
- Скачайте zip-архив с проектом.
- Распакуйте его в удобное для вас место.
- Откройте проект в редакторе кода (например, Visual Studio Code).

---

### 2. Настройка файла `.env`
Найдите файл `.env` в корневой папке проекта и добавьте в него следующие переменные окружения:

`env`:
```
MONGODB_URL=Ваша строка подключения к базе данных MongoDB.
JWTSecret=kkgjdhfgdfkgbhdfbgdfhg156g46fg
refreshTokenSecret=hlndfghfdh5gf5h65gitgfh+65gf6h1gf65gf1f4gh1gf1h981gf91gf98h1gf98h1g56fg6h1fg
USER=Электронная почта, которая будет использоваться для отправки кодов восстановления аккаунтов пользователям.
PASS=Пароль приложения для указанного адреса электронной почты.
```
JWTSecret и refreshTokenSecret - это токены безопасности. Их менять не надо, они уже настроены, но если вы разбираетесь в этом, то можете побаловаться.

---

# 3. Настройка переменных окружения и запуск проекта

Как получить `PASS`:

1. Перейдите в **[Управление аккаунтом Google](https://myaccount.google.com/)**.
2. Перейдите в раздел **"Безопасность"**.
3. Включите **двухфакторную аутентификацию**.
4. Найдите и откройте раздел **"Пароли приложений"** (можно использовать поиск, если не получится найти).
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
     - Откройте ваш браузер. Перейдите по адресу: http://localhost:3000 или, если вы изменили адрес, переходите по выбранному вами адресу.

5. Перед началом работы убедитесь, что у вас установлено следующее:
    - Node.js (рекомендуется версия 16 или выше). https://nodejs.org
    - MongoDB, чтобы подключиться к базе данных. https://www.mongodb.com

6. Если возникают ошибки подключения к MongoDB:
    - Убедитесь, что переменная MONGODB_URL в .env указана корректно.
    - Проверьте доступ к вашей базе данных.

7. Если вы используете почтовый сервис, отличный от Google:
    - Настройка для получения пароля приложения может отличаться.
    - Обратитесь к документации вашего почтового провайдера для получения дополнительной информации.

---

Если у вас возникли вопросы или проблемы, создайте новый Issue в репозитории. Я постараюсь вам помочь!
