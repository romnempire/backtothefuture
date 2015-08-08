var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tutorial/:tagId', function(req, res) {
  var collection = req.db.get('tutorialcollection');
  collection.find({title: req.params.tagId}, {}, function(e, docs) {
    console.log(docs[0]._id);
    if (docs.length == 0) {
      res.send('Error, no page found');
    } else {
      collection.find({relID: docs[0]._id}, {}, function(e, newDocs) {
        res.render('page', { 
          title: docs[0].title, 
          body: docs[0].body, 
          comments: newDocs,
          pageID: docs[0]._id
        });
      });
    }
  });
});

router.post('/addcomment/:tagId', function(req, res) {
  var collection = req.db.get('tutorialcollection');
  var comment = req.body.comment
  collection.insert({
    "relID" : collection.id(req.params.tagId),
    "text" : comment
  }, function(err, doc) {
    if (err) {
      res.send("There was a problem");
    } else {
      res.redirect('/tutorial/howtocook');
    }
  });
});

module.exports = router;
