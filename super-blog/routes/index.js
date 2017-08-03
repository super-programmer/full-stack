var express = require('express');
var router = express.Router();
var usr= require('dao/dbConnect');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express3' });
});
router.get('/login', function (req, res, next) {
  client = usr.connect();
  result = null;
  console.log(req.body)
  usr.selectFun(client, req.body.username, function (result) {
    if (result[0] === undefined) {
      res.send('没有该用户');
    } else {
      if (result[0].password === req.body.password) {
        console.log(req.body);
        //todo something
        res.json({"errorCode": 0,"errorMessage": 'save'});
      } else {
        res.redirect('/login');
      }
    }
  });
});
router.get('/sign', function (req, res, next) {
  client = usr.connect();
  result = null;
  usr.selectFun(client,"ddd", function (result) {
    if (result[0] === undefined) {
      usr.insertFun(client,"ddd",123456, function (result){
        console.log(result);
        res.json({"Code":200,"Message": 'success'});
      })
    } else {
      res.json({"Code":202,"Message": 'success'});
    }
  });
});

module.exports = router;
