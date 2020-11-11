const path = require("path");
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express();

// ./mongo "mongodb+srv://cluster0.efqqc.mongodb.net/node-angular" --username harold
// 22lLDc7HT6hPo3Dy
mongoose.connect('mongodb+srv://harold:22lLDc7HT6hPo3Dy@cluster0.efqqc.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images"))); //Allows requests to images folder

app.get('/favicon.ico', (req, res) => res.status(204));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS' //Can also have PUT
  )
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
