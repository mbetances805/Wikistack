const express = require('express');
const wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = wikiRouter;

wikiRouter.get('/', function (req, res) {
  res.redirect('/')
})

wikiRouter.post('/', function (req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  User.findOrCreate({
    where: {
      name: req.body.author_name,
      email: req.body.author_email
    }
  })
  .then(function(values){
    var user = values[0];
    var page = Page.build({
        title: req.body.title,
        content: req.body.content
      });

      return page.save()
        .then(function(page){
          return page.setAuthor(user);
        });
    })
  .then(function(savedPage){
        res.redirect(savedPage.urlTitle)
    })
  .catch(next);

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  // -> after save -> res.redirect('/');
});




wikiRouter.get('/add', function (req, res) {
  res.render('addpage.html')
});

wikiRouter.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })


  .then(function (foundPage){
    const pageProps = foundPage.dataValues;
    const author = foundPage.getAuthor().then(function(author) {return author});
    console.log("******", author)
    res.render('wikipage', {pageProps: pageProps, author: author});
  })
  .catch(next);
})
