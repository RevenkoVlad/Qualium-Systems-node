const express = require('express');
const bodyParser= require('body-parser')
const mongoClient = require('mongodb').MongoClient

const expressApp = express();

expressApp.use(bodyParser.json())
expressApp.use(bodyParser.urlencoded({extended: true}))
expressApp.use(express.static('public'))

expressApp.set('view engine', 'ejs')


var connToMongoDB
mongoClient.connect('mongodb://admin:admin@ds133192.mlab.com:33192/revenko-test-qualium', (err, database) => {
  if (err) return console.log(err)
  connToMongoDB = database
  expressApp.listen(3000, () => {
  console.log('listening on 3000')
})
})


expressApp.get('/', (req, res) => {
  connToMongoDB.collection('users').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {users: result})
  })
})

expressApp.post('/users', (req, res) => {
  connToMongoDB.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

expressApp.put('/users', (req, res) => {
  connToMongoDB.collection('users')
  .findOneAndUpdate({name: 'Dima'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

expressApp.delete('/users', (req, res) => {
  connToMongoDB.collection('users').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Deleted')
  })
})
