const path = require("path");
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

// ./mongo "mongodb+srv://cluster0.efqqc.mongodb.net/node-angular" --username harold

mongoose.connect('mongodb+srv://harold:'+ process.env.MONGO_ATLAS_PW +'@cluster0.efqqc.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images"))); //Allows requests to images folder
app.use("/", express.static(path.join(__dirname, "angular")));

app.get('/favicon.ico', (req, res) => res.status(204));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, PUT, DELETE, OPTIONS' //Can also have PUT
//   )
//   next();
// });

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;
