const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');
// const personSchema = require('./Person').schema;

// connect to the database
mongoose.connect('mongodb://localhost:27017/richesnathan', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

 // Create a schema foro a person
 const personSchema = new mongoose.Schema({
    name: String,
    age: String,
    hometown: String,
  });

  const Person = mongoose.model('Person', personSchema);

// Create a scheme for items in the museum: a title and a path to an image.
const albumSchema = new mongoose.Schema({
    title: String,
    path: String,
    artist: String,
    year: String,
    submitter: {type: personSchema},
  });
  
  // Create a model albums
  const Album = mongoose.model('Album', albumSchema);

  module.exports = mongoose.model('Person', personSchema);

  // Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
    // Just a safety check
    if (!req.file) {
      return res.sendStatus(400);
    }
    res.send({
      path: "/images/" + req.file.filename
    });
  });

  // Create a new album
app.post('/api/items', async (req, res) => {
    console.log(req.body);
    console.log(req.body.submitter);
    const item = new Album({
      title: req.body.title,
      path: req.body.path,
      artist: req.body.artist,
      year: req.body.year,
      submitter: req.body.submitter,
    });
    console.log(item);
    try {
      await item.save();
      res.send(item);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  // Create new person
  app.post('/api/persons', async (req, res) => {
      console.log("here!");
      const person = new Person({
          name: req.body.name,
          age: req.body.age,
          hometown: req.body.hometown,
      });
      console.log(person);
      try {
          await person.save();
          res.send(person);
      } catch (error) {
          console.log(error);
          res.sendStatus(500);
      }
  });
  
  // Get a list of all albums
  app.get('/api/items', async (req, res) => {
    try {
      let items = await Album.find();
      res.send(items);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  // Get a list of all persons
  app.get('/api/persons', async (req, res) => {
      try {
          let persons = await Person.find();
          res.send(persons);
      } catch (error) {
          console.log(error);
          res.sendStatus(500);
      }
  });
  
  //Delete an album
  app.delete('/api/items/:id', async (req, res) => {
    try {
      await Album.deleteOne({
        _id: req.params.id
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  // Delete a person
  app.delete('/api/persons/:id', async (req, res) => {
    try {
      await Person.deleteOne({
        _id: req.params.id
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  
  //Edit album
  app.put('/api/items/:id', async (req, res) => {
    let item = await Album.findOne({
      _id: req.params.id
    });
    try {
      item.title = req.body.title;
      item.artist = req.body.artist;
      item.year = req.body.year;
      item.submitter = req.body.submitter;
      await item.save();
      res.send(item);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  //Edit person
  app.put('/api/persons/:id', async (req, res) => {
    let person = await Person.findOne({
      _id: req.params.id
    });
    try {
      person.name = req.body.name;
      person.age = req.body.age;
      person.hometown = req.body.hometown;
      await item.save();
      res.send(item);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });


app.listen(3001, () => console.log('Server listening on port 3001!'));