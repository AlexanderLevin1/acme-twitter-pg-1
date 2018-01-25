const pg  = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

const CREATE_TABLES = `
  DROP TABLE IF EXISTS tweets;
  CREATE TABLE tweets(
    id SERIAL PRIMARY KEY,
    content VARCHAR(255)
  );
`;

const SEED = `
  INSERT INTO tweets(content) values('foo');
  INSERT INTO tweets(content) values('bar');
  INSERT INTO tweets(content) values('bazz');
`;

const sync = (cb)=> client.query(CREATE_TABLES, cb);

const seed = (cb)=> query(SEED, [], cb);

const getTweets = (cb)=> {
  query('SELECT * from tweets', [], (err, result)=> {
    if(err) return cb(err);
    cb(null, result.rows);
  });
};

const getTweet = (id, cb)=> {
  query('SELECT * from tweets where id = $1', [id], (err, result)=> {
    if(err) return cb(err);
    cb(null, result.rows.length ? result.rows[0] : null);
  });
};

const query = (sql, params, cb)=> client.query(sql, params, cb);

module.exports = {
  sync,
  seed,
  getTweets,
  getTweet
};
