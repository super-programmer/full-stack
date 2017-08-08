var express = require('express');
var router = express.Router();
var usr= require('dao/dbConnect');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express3' });
});
router.get('/sign', function (req, res, next) {
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
        res.json({"errorCode": 201,"errorMessage": '手机号已经注册！'});
    }
  });
});
router.get('/login', function (req, res, next) {
  client = usr.connect();
  result = null;
  var data=JSON.parse(req.query.data)
  usr.selectFun(client, data.phoneNum, function (result) {
    if (result[0] === undefined) {
      res.json({"errorCode": 203,"errorMessage": '未注册！'});
    } else {
      if (result[0].password === data.password) {
        res.json({"errorCode": 200,"errorMessage": '登录成功！'});
      } else {
        res.json({"errorCode": 400,"errorMessage": '密码错误！'});
      }
    }
  });
});

module.exports = router;
