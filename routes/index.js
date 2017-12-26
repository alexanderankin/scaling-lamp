var express = require('express');
var router = express.Router();

var querystring = require('querystring');

var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  var info = {
    client_id     : 'client_id',
    redirect_uri  : 'http://localhost:4001/redirect_uri',
    scope         : 'mail',
    response_type : 'code',
    // state         : '',
  };

  var queryString = querystring.stringify(info);
  res.render('page', { title: 'Express', page: `
    <a href="http://localhost:4000/oauth/authorize/?${queryString}">loginlink</a>
  ` });
});

router.get('/redirect_uri', function (req, res, next) {
  var code = req.query.code;

  request.post('http://localhost:4000/oauth/token', {
    json: true,
    body: { code }
  }, function (err, resp, body) {
    var token = body.token;

    res.render('page', { title: 'Express | redirect_uri', page: `
      <p>body</p>
      <p>the Code is : ${code}</p>
      <p>the Token is : ${JSON.stringify(token)}</p>
      <pre>${JSON.stringify(req.body)}</pre>
      <p>query</p>
      <pre>${JSON.stringify(req.query)}</pre>
    ` });
  })
});

module.exports = router;
