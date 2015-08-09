var express = require('express');
var router = express.Router();

router.get('/:tagId', function(req, res) {
  var collection = req.db.get('tutorials');
  collection.find({_id: req.params.tagId}, {}, function(e, docs) {
    console.log(docs[0]._id);
    if (docs.length == 0) {
      res.send('Error, no page found');
    } else {
      collection.find({relID: docs[0]._id}, {}, function(e, newDocs) {
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
  var collection = req.db.get('tutorials');
  var comment = req.body.comment;
  console.log("entered rt");
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

module.exports = router;
