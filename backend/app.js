// var createError = require('http-errors');
// var express = require('express');
// const cors = require('cors');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();
// require("./db");

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);


// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;



//chat include:const express = require('express');
const detectPort = require('detect-port').default;

const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
require('dotenv').config();

// Express App Initialization
const app = express();
const server = http.createServer(app);

// Safe port fallback
const PORT = process.env.PORT || 5050;

// MongoDB URI check
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('❌ MONGO_URI not found in .env file');
  process.exit(1); // Exit if not found
}

// MongoDB Connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => {
  console.error('❌ MongoDB Error:', err);
  process.exit(1);
});

// CORS Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const chatRoutes = require('./routes/chatRoutes');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/chat', chatRoutes);

// Error Handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// ✅ Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const users = new Map();

io.on('connection', (socket) => {
  console.log('📡 Socket connected:', socket.id);

  socket.on('join', (email) => {
    users.set(email, socket.id);
    socket.email = email;
    console.log(`👤 ${email} joined chat`);
  });

  socket.on('sendMessage', ({ sender, receiver, message }) => {
    const receiverSocketId = users.get(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveMessage', { sender, message });
      console.log(`💬 ${sender} ➡️ ${receiver}: ${message}`);
    }
  });

  socket.on('disconnect', () => {
    users.delete(socket.email);
    console.log('❌ Socket disconnected:', socket.id);
  });
});

// Start Server
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });




const DEFAULT_PORT = process.env.PORT || 5050;



detectPort(DEFAULT_PORT).then(_port => {
  if (DEFAULT_PORT != _port) {
    console.log(`⚠️ Port ${DEFAULT_PORT} is busy, trying ${_port} instead...`);
  }

  server.listen(_port, () => {
    console.log(`🚀 Server running on http://localhost:${_port}`);
  });
});
module.exports = app;