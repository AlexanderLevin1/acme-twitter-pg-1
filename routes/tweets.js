const app = require('express').Router();
const db = require('../db');

module.exports = app;

app.get('/', (req, res, next)=> {
  db.getTweets((err, tweets)=> {
    if(err)return next(err);
    res.render('tweets', { title: 'Tweets', tweets});
  });
});

app.get('/:id', (req, res, next)=> {
  db.getTweet(req.params.id, (err, tweet)=> {
    if(err)return next(err);
    res.render('tweet', { title: 'Tweet', tweet});
  });
});
