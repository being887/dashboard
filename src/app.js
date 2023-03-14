// server.js
const express = require('express');
const {engine} = require('express-handlebars');

const Chart = require('chart.js');
const mongoose=require('mongoose')
const app = express();
const port = 3000;
const path=require('path');
var database
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('public',express.static(path.join(__dirname, '../public')));

app.set('view engine', 'hbs');
  app.get('/', (req, res) => {  
  res.render('index');
})

app.get('/sales', (req, res) => {
  mongoose.connection.db.collection('Ab').find({}).toArray().then((data)=>{
    res.send(data)
  }).catch((err)=>{
    console.log("unable to fetch")
  })
  
});
  app.listen(port, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/arun', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connected to MongoDB server');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB server:', err.message);
    });
  });

