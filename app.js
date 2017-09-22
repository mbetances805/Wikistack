var express = require('express');
var app = express();
var morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
var models = require('./models');


app.use(express.static('public'));

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);


models.db.sync({force: true})
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);
