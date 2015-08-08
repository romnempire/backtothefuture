var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tutorial/:tagId', function(req, res) {
  var collection = req.db.get('tutorialcollection');
  collection.find({title: req.params.tagId}, {}, function(e, docs) {
    if (docs.length == 0) {
      res.send('Error, no page found');
    } else {
    res.render('page', { title: docs[0].title, body: docs[0].body });
    }
  });
});

module.exports = router;
