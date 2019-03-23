const axios = require('axios');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({ explicitArray: false });
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
app.use(allowCrossDomain);
app.post('/search', (req, res) => {
  axios
    .get(
      `https://www.goodreads.com/search/index.xml?q=${
        req.body.searchKey
      }&key=tF23IJMNb4qa9sYdJW4Nw&search=title`
    )
    .then(response => {
      parser.parseString(response.data, function(err, result) {
        res.send(result);
      });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/book', (req, res) => {
  axios
    .get(
      `https://www.goodreads.com/book/title.xml?&title=${
        req.body.book
      }&key=tF23IJMNb4qa9sYdJW4Nw`
    )
    .then(response => {
      parser.parseString(response.data, function(err, result) {
        res.send(result);
      });
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
