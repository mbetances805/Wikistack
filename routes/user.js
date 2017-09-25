const express = require('express');
const userRouter = express.Router();
const models = require('../models')
var Page = models.Page;
var User = models.User;

module.exports = userRouter;

userRouter.get('/', function (req, res, next) {
  User.findAll()
  .then(function (users) {
    res.render('users.html', {users})
  })
  .catch(next)
})

// router.get('/', function(req, res){
//   Page.findAll()
//   .then(function(pages){
//       res.render('index.html', {pages})
//     })
// });


userRouter.get('/:id', function (req, res, next) {
  var userPromise = User.findOne({
    where: {
      id: Number(req.params.id)
    }
  })
  var pagesPromise = Page.findAll({
    where: {
      authorId: Number(req.params.id)
    }
  })

  Promise.all([userPromise, pagesPromise])
  .then(function(values) {
    const user = values[0];
    const pages = values[1];

    res.render('user.html', {user: user, pages: pages})
  })
  .catch(next);
});


userRouter.post('/', function(req, res){

});

userRouter.put('/:number', function(req, res){

});

userRouter.delete('/:number', function(req, res){

});

// GET	/users/	get all users, do not change db
// GET	/users/123	get user 123, do not change db
// POST	/users/	create a user in the db
// PUT	/users/123	update user 123 in the db
// DELETE	/users/123
