var express = require('express');
var router = express.Router();
var db=require('../../database');

router.get('/:username', function(req, res, next) {
    var sql='SELECT * FROM books order by Name';
    db.query(sql, function (err, results, fields) {
    if (err) throw err;
    sql='SELECT * FROM users WHERE username = ?'
    db.query(sql,[req.params.username],(err,data)=>{
    res.render('user-book-list',{username: data,imageData: results});
    });
  });
});
module.exports = router;
