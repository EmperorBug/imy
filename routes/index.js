var express     = require('express');
var router      = express.Router();
var mysql       = require('mysql');
var dbconfig    = require('../config/database.js');
var connection  = mysql.createConnection(dbconfig);
var fs          = require('fs');
var app         = express();

var session = app.session;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HELLO', name: 'kimdohyung' });
});

router.get('/test', function(req, res) {
  console.log(34343434);
    res.render('main', {session:req.session.key});
});

//
// get은 query string으로 넘기므로 req.query로받음
// 여기서는 파라미터로 넘겼기에 params로받음
//
router.get('/test/get/:id', function(req, res) {

  const MEMBER_ID = req.params.id;

  connection.query(`SELECT * FROM USER WHERE ID = '${MEMBER_ID}'`, function(err, rows) {
    if (!err) {
      res.json({status:1, data: rows, cnt: rows.length});
    }
    else {
      console.log('Errow while performing Query.',err);
    }
  });
});

//
// 게시판 이동
//
router.get('/board', function(req, res) {
  res.render('board');
});


router.post('/join', function(req, res) {
  console.log(req.body);
  const ID = req.body.id;
  const PASSWORD = req.body.pwd;
  connection.query(`INSERT INTO USER (ID, PASSWORD) VALUES ('${ID}', '${PASSWORD}')`);
  res.redirect('/');
});

//  api test
router.get('/api/kanji', function (req,res) {
  connection.query(`SELECT * FROM test`, (err, rows) => {
    if (!err) {
      console.log(rows);
      res.json({data:rows});
    }


  })
});

//
//  post는 req.body로 받음
//
router.post('/api/test', function(req, res) {

  const ID = req.body.id;
  const PASSWORD = req.body.pwd;
  connection.query(`SELECT * FROM USER WHERE ID = '${ID}' AND PASSWORD= '${PASSWORD}'`, function(err, rows) {
    if (!err) {
      if (rows.length == 0 ) {
        res.send('<script type="text/javascript">alert("아이디또는 비밀번호를 확인해주세요."); history.back(-1);</script>');    //로그인이 안될시 이전페이지로 이동시킴
      }
      else {
        req.session.key = ID;
        req.session.save(function() {
          return res.redirect('/test');
        })
      }
    }
    else {
      console.log('Errow while performing Query.',err);
    }
  });
});

router.post('/api/logout', function(req, res) {
  if (req.session.key != undefined) {
    req.session.destroy(function(err) {
      if (err) {
        res.send('<script type="text/javascript">alert("로그아웃에 실패하였습니다. 다시 시도해 주세요."); history.back(-1);</script>'); 
      }
      else {
        res.redirect('/test');
      }
    })
  }
});

router.get('/test/cal', function(req,res) {
  res.render('calcurator');
});
module.exports = router;