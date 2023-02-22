const express = require("express");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(session({
  key: 'user_sid',
  secret: "thisismysecrctekey",
  resave: true,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 1*60*60*1000*48
  }
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(cookieParser());

//Connecting to MongoDB Database
mongoose
  .connect(
    `mongodb://127.0.0.1:27017/mini_project`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.warn("Database connection is done"));

  // Database Schema for storing questions
  const questionSchema = {
    questionid: String,
    difficulty: String,
    description: String,
    wrongcodefile: String,
    rightcodefile: String,
    wrongcode: String,
  };

  // User Schema for storing their progress
  const usersSchema = {
    username: String,
    password: String,
    arr: Array,
    index: Number,
  };

  const questions = mongoose.model("questions", questionSchema);
  const User = mongoose.model("User", usersSchema);

  //generate random number between two numbers
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  //Generate Random Array
  function generateRandomArray(n){
    var arr = "";
    for(let i=0;i<n;i++){
      var x = randomIntFromInterval(1,10);
      arr = arr + x;
      arr += " ";
    }
    return arr;
  }

  app.get("/", (req, res) => {
      res.render(`${__dirname}/Client/homepage.ejs`,{ alert : false });
  });

  app.get("/login", (req, res) => {
    res.render(`${__dirname}/Client/login.ejs`);
  });

  app.post("/login", async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const name = await User.findOne({ username: username });
      
      if(!name){
        let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let newuser = new User({
          username: username,
          password: password, 
          arr: list.sort(() => Math.random() - 0.5),
          index: Number(0)
        });
        // newuser.arr = ;
        req.session.username = username;
        req.session.password = password;
        // req.session.index = 0;

        newuser.save();
        return res.redirect("/logout");
      }
      else{
        if(name.password == password){
          req.session.username = username;
          req.session.password = password;
          // req.session.index = name.index;
          return res.redirect("/logout");
        }
        else{
          return res.render(`${__dirname}/Client/homepage.ejs`, {alert : true});
        }
      }
   } catch (error) {
      console.log(error);
      return res.status(400).send("Invalid Password");
    }
  });

  app.get("/logout", (req, res) => {
    res.render(`${__dirname}/Client/homepagelogout.ejs`);
  });

  app.get("/logoutbutton", (req, res) => {
    if (req.session.username && req.cookies.user_sid) {
      req.session.username={};
      res.clearCookie('user_sid');
      req.session.destroy((err) => {
        if (err) {
          return console.log(err);
        }
        res.redirect("/");
      });
    }
  });

  app.get("/question", async (req, res) => {
    if (req.session.username && req.cookies.user_sid) {
      const username = req.session.username;

      const name = await User.findOne({ username: username });
    // const ran = randomIntFromInterval(1, 10);
    
    // const strran = ran.toString();
    if(name.arr.length == name.index){
      let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      name.arr = list.sort(() => Math.random() - 0.5);
      name.index = 0;
      name.save();
    }

    var data = await questions.findOne({ questionid: name.arr[name.index] });

    const n1 = "" + randomIntFromInterval(1, 9);
    const arr1 = generateRandomArray(n1);
    
    const n2 = "" + randomIntFromInterval(1, 9);
    const arr2 = generateRandomArray(n2);

    const n3 = "" + randomIntFromInterval(1, 9);
    const arr3 = generateRandomArray(n3);

    res.render(`${__dirname}/Client/questionpage.ejs`, {
      difficulty:  data["difficulty"],
      description: data["description"],
      wrongcodefile : data["wrongcodefile"],
      rightcodefile : data["rightcodefile"],
      wrongcode : data["wrongcode"],
      n1 : n1,
      arr1: arr1,
      n2 : n2,
      arr2: arr2,
      n3 : n3,
      arr3: arr3,
    });
   }
  });

  app.get("/next", async (req, res) => {
    if (req.session.username && req.cookies.user_sid) {
    try {
      const username = req.session.username;
      const name = await User.findOne({ username: username });
      name.index = name.index + 1;
      name.save();
      res.redirect("/question");
    } catch (error) {
      res.status(400).send("Error");
    }
   }
   });

   app.get("/submit", async (req, res) => {
    try {
      res.redirect("/logout");
    } catch (error) {
      res.status(400).send("Error");
    }
  });

let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}

app.listen(port);
