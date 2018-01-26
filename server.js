const db = require('./db');
const path = require('path');
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use((req, res, next)=> {
  res.locals.path = req.url;
  next();
});

app.get('/', (req, res, next)=> {
  res.render('index', { title: 'Twitter' });
});

app.use('/tweets', require('./routes/tweets'));

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));

db.sync(function(err, result){
  if(err){
    return console.log(err);
  }
  db.seed((err)=> {
    if(err){
      return console.log(err);
    }
  });
});
