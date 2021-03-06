var express = require('express');
var router = express.Router();
var CTString = require('../util/CTString')

router.post('/*', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  if(!req.body.userName) {
    res.send(CTString.toString({errNo:ErrNo.invalidParm,errInfo:'参数错误'}));    
    return    
  }
  next()
})

/* User login */
router.post('/login', function(req, res, next) {
  req.userManager.auth(req.body.userName, req.body.password)
  .then(result => {
    if(result !== ErrNo.success) {
      res.send(CTString.toString({errNo:ErrNo.invalidParm,errInfo:'登录失败'}));    
      return  
    }
    res.send(CTString.toString({errNo:ErrNo.success}));
  })
});

/* User register */
router.post('/register', function(req, res, next) {
  req.userManager.addUser(req.body)
  .then(user => {
    res.send(CTString.toString({errNo:ErrNo.success}));    
  })
  .catch(error => {
    res.send(CTString.toString({errNo:error,errInfo:'用户已存在'}));        
  })
});

/* User register */
router.post('/delUser', function(req, res, next) {
  req.userManager.delUser(req.body.userName)
  .then(user => {
    res.send(CTString.toString({errNo:ErrNo.success}));    
  })
});

/* User check */
router.post('/check', function(req, res, next) {
  req.userManager.checkExist(req.body.userName)
  .then(exist => {
    res.send(CTString.toString({errNo:ErrNo.success, exist:exist}));    
  })
});

/* User logout */
router.post('/logout', function(req, res, next) {
  res.send('respond with a resource,logout');
});

module.exports = router;
