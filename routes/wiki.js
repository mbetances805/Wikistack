var wikiRouter = express.Router();
var express = require('express');

module.exports = wikiRouter;

wikiRouter.get('/', function (req, res) {
  console.log('this is working!')
  res.redirect('/')
})

wikiRouter.post('/', function (req, res) {
  console.log('this is also working')
})

wikiRouter.get('/add', function (req, res) {
  res.render('addpage')
})
