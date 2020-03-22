var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var passport = require("passport");
var users = require("./routes/api/users");
var boards = require("./routes/api/boards");
var cors = require('cors')
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));


const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected successfully "))
  .catch(err => console.log(err));

  app.use(passport.initialize());
  require("./config/passport")(passport);
  app.use("/users", users);
  app.use("/boards", boards);
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname , '../client/build/index.html'));
  });
module.exports = app;
