const express =require('express');
const mongoose = require('mongoose');
const path=require('path');
const dotenv=require('dotenv');
const morgan=require('morgan');
const methodOverride=require('method-override');
const passport = require('passport');
const session = require('express-session');
const MongoStore =require('connect-mongo');
var moment = require('moment');
const connectDB = require('./server/database/connection');


//load config
dotenv.config({path: 'config.env'});

//Passport Config
require('./config/passport')(passport)

const app=express();

//Connect MongoDB
connectDB()

//Body Parser
app.use(express.urlencoded({extended: false}));
app.use(express.json())

//Method Overriding
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))


//logging
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

//EJS Global Variable
app.locals.moments=(date)=>{
  return moment(date)
}
app.locals.countGraph=0;
app.locals.setCountGraph=()=>{
  countGraph=0;
}
app.locals.shortDate = (item) => {
  date = new Date(item);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();
    
    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    //console.log(dt+'/' + month + '/'+year);
    return (dt+'/' + month + '/'+year);
}
app.locals.stripTags= (input)=> {
  return input.replace(/<(?:.|\n)*?>/gm, '')
}
app.locals.getPercentage = (presents,totalClasses) =>{
  return ((presents/totalClasses)*100);
}
//EJS Set View 
app.set("view engine", "ejs")


//Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongooseConnection: mongoose.connection,
    mongoUrl:process.env.MONGO_URI
    })
  }))

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/dashboard/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/dashboard/logs/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/dashboard/logs/edit/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/dashboard/todos/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/dashboard/logs/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/dashboard/todos/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/dashboard/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


//Routes
app.use('/',require('./server/routes/router'));
app.use('/auth',require('./server/routes/auth'));
app.use('/dashboard/logs',require('./server/routes/logs'));
app.use('/dashboard/todos',require('./server/routes/todos'));
app.use('/dashboard/pomodoro',require('./server/routes/pomodoro'));
app.use('/dashboard/maintainer',require('./server/routes/maintainer'));

const PORT=process.env.PORT||5000

app.listen(
    PORT,
    console.log(`Server running in on port ${PORT}`)
)