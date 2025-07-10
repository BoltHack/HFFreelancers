const createError = require('http-errors');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const start = require('./services/db');
const indexRouter = require('./routes/index');
// const socketIo = require('socket.io');
// const {WebsitesModel} = require("./models/WebSitesModel");
// const {UsersModel} = require("./models/UsersModel");
const http = require("http");
// const mongoose = require("mongoose");
// const {MongooseError} = require("mongoose");
// const jwt = require("jsonwebtoken");

// const JWTSecret = process.env.JWTSecret;

const app = express();
const server = http.createServer(app);
// const io = socketIo(server);

// app.use(async (req, res, next) => {
//   try {
//     await start();
//     next();
//   }catch (e){
//     console.log('Ошибка при подключении к базе данных.', e);
//     return res.redirect(`/error?message=${encodeURIComponent("Ошибка.")}`);
//   }
// })
start();

// io.use((socket, next) => {
//   const cookies = socket.handshake.headers.cookie;
//
//   if (cookies) {
//     const parsedCookies = parseCookies(cookies);
//
//     if (parsedCookies.token) {
//       try {
//         const user = jwt.verify(parsedCookies.token, JWTSecret);
//         socket.user = user;
//         return next();
//       } catch (err) {
//         console.error('Token verification error:', err.message);
//         return next(new Error('Authentication error'));
//       }
//     }
//   }
//
//   return next(new Error('No token provided'));
// });
//
// function parseCookies(cookieHeader) {
//   const cookies = {};
//   cookieHeader.split(';').forEach(cookie => {
//     const parts = cookie.split('=');
//     cookies[parts.shift().trim()] = decodeURI(parts.join('='));
//   });
//   return cookies;
// }

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', indexRouter);

// io.on('connection', async (socket) => {
//   const userId = await UsersModel.findById(socket.user.id)
//   const author = userId.name
//   const avatar = userId.image
//   console.log('New user connected');
//
//   const messages = await WebsitesModel.find().sort({ timestamp: 1 }).limit(10);
//   socket.emit('previousMessages', messages);
//
//   socket.on('chat message', async (msg, siteId) => {
//
//     try {
//       await WebsitesModel.findByIdAndUpdate(siteId, {
//         $inc: { commentsNumber: 1 },
//       });
//
//       // console.log('msg', msg);
//       console.log('siteId', siteId);
//       // console.log('author', author);
//       // console.log('avatar', avatar);
//       // console.log('user', socket.user.name)
//
//       const siteComment = await WebsitesModel.findById(siteId);
//       if (siteComment) {
//         siteComment.comments.push({ author, avatar, message: msg });
//         await siteComment.save();
//       }
//
//       io.emit('chat message', { author: socket.user.name, avatar: socket.user.image, message: msg });
//     } catch (error) {
//       console.error('Ошибка при сохранении сообщения:', error);
//     }
//
//     // io.emit('chat message', { author: socket.user.name, avatar: socket.user.image, message: msg });
//   });
//
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  const message = req.query.message || err.message;

  let locale = req.cookies['locale'] || 'en';

  if (!req.cookies['locale']) {
    res.cookie('locale', locale, { httpOnly: true });
  }

  // if (MongooseError){
  //   const errorMsg = locale === 'en' ? 'Error connecting to database' : 'Ошибка при подключении к базе данных';
  //   res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
  // }

  if (locale === 'en'){
    res.render('en/error', { message });
  }
  else{
    res.render('ru/error', { message });
  }
});

server.listen(3000, () => {
  console.log('Сервер запущен на порту: http://localhost:3000');
});
