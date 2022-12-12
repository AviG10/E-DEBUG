const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static("public"));

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

  const questions = mongoose.model("questions", questionSchema);

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
      res.render(`${__dirname}/Client/homepage.ejs`);
  });

  app.get("/question", async (req, res) => {
    const ran = randomIntFromInterval(1, 10);
    
    const strran = ran.toString();
    var data = await questions.findOne({ questionid: strran });

    const n1 = "" + randomIntFromInterval(1, 9);
    const arr1 = generateRandomArray(n1);
    
    // console.log(n1);
    // console.log(arr1);
    
    const n2 = "" + randomIntFromInterval(1, 9);
    const arr2 = generateRandomArray(n2);
    
    // console.log(n2);
    // console.log(arr2);

    const n3 = "" + randomIntFromInterval(1, 9);
    const arr3 = generateRandomArray(n3);
    
    // console.log(n3);
    // console.log(arr3);


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
  });

  app.get("/next", async (req, res) => {
    try {
      res.redirect("/question");
    } catch (error) {
      res.status(400).send("Error");
    }
   });

   app.get("/submit", async (req, res) => {
    try {
      res.redirect("/");
    } catch (error) {
      res.status(400).send("Error");
    }
  });

let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}

app.listen(port);
