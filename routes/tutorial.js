var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var collection = req.db.get('testTutorials');
  collection.find({}, {}, function(e, docs) {
    res.render('tutorialfeed', {tutorials : docs});
  });
});

router.get('/newtutorial', function(req, res) {
  res.render('newtutorial');
});

// This should be the the last get request always!
router.get('/:tagId', function(req, res) {
  var collection = req.db.get('testTutorials');
  collection.find({_id: req.params.tagId}, {}, function(e, docs) {
    console.log(docs[0]._id);
    if (docs.length == 0) {
      res.send('Error, no page found');
    } else {
      req.db.get('testComments').find({relID: docs[0]._id}, {}, function(e, newDocs) {
        res.render('tutorialspage', { 
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
  var collection = req.db.get('testComments');
  var comment = req.body.comment;
  collection.insert({
    "relID" : collection.id(req.params.tagId),
    "text" : comment
  }, function(err, doc) {
    if (err) {
      res.send("There was a problem");
    } else {
      res.redirect('/tutorial/'+req.params.tagId);
    }
  });
});

router.post('/addtutorial', function(req, res) {
  var collection = req.db.get('testTutorials');
  var title = req.body.title;
  var body = req.body.body;
  collection.insert({
    "title" : title,
    "body" : body
  }, function(err, doc) {
    if (err) {
      res.send("There was a problem.");
    } else {
      res.redirect('/tutorial');
    }
  });
});

module.exports = router;
