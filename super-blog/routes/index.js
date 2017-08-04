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
  var data=JSON.parse(req.query.data)
  usr.selectFun(client, data.phoneNum, function (result) {
    if (result[0] === undefined) {
      //res.send('用户不存在');
      usr.insertFun(client,data.phoneNum,data.password,data.phoneNum,function(result){
        res.send('创建用户成功');
      })
    } else {
      if (result[0].password === data.password) {
        //todo something
        res.json({"errorCode": 0,"errorMessage": '手机号已经注册！'});
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
