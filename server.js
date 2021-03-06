const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

//set the app to use ejs template and public folder for js script
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(bodyParser.json())

var db;

MongoClient.connect('mongodb://raj:raj@ds147072.mlab.com:47072/test_raj', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(80, () => {
    console.log('listening on 80')
  })
})

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  db.collection('nelsons').find().toArray(function(err, results) {
  console.log(results)
  if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {nelsons: results})
  //res.send(results);
  // send HTML file populated with quotes here
})
  //do something here
  //res.send("Hello World");
  //res.sendFile(__dirname + '/index.html');
  //res.redirect('/')
})

app.post('/nelsons', (req, res) => {
  db.collection('nelsons').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  /*console.log(req.body);
  res.sendFile(__dirname + '/index.html');*/
})
})

// this dunction update then redirect to new page
app.post('/nelson_put', (req, res) => {
  db.collection('nelsons')
  .findOneAndUpdate({name: 'Shigaraki'}, {
    $set: {
      name: 'Shigaraki',
      position: req.body.position
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/')
    //res.redirect('/');
  })
})

//This function it has to be used for javascript fonction
app.put('/nelsons', (req, res) => {
  db.collection('nelsons')
  .findOneAndUpdate({name: 'Shigaraki'}, {
    $set: {
      name: req.body.name,
      position: req.body.position
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
    //res.redirect('/');
  })
})

// Special Function For nelson object
app.get('/nelsons/:nelson_name', (req, res) => {
  db.collection('nelsons').find({name: req.params.nelson_name}).toArray(function(err, results) {
  console.log(results)
  if (err) return console.log(err)

  res.send(results);
})
})

//Special Function for modify value by Nelson Object
app.put('/nelsons/:nelson_name/:position', (req, res) => {
  db.collection('nelsons')
  .findOneAndUpdate({name: req.params.nelson_name}, {
    $set: {
      name: req.params.nelson_name,
      position: req.params.position
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


/*app.listen(3000, function(){
  console.log("Listening on 3000");
})*/
