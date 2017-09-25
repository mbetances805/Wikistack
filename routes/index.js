var express = require('express');
var router = express.Router();
var wikiRouter = require("./wiki");
var userRouter = require("./user");
const models = require('../models/');
var Page = models.Page;

router.use('/wiki', wikiRouter);

router.use('/users', userRouter);

router.get('/', function(req, res){
  Page.findAll()
  .then(function(pages){
      res.render('index.html', {pages})
    })
});


module.exports = router;
