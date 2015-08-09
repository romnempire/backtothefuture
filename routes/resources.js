var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var resources = {
    tabs: ['work', 'housing', 'food', 'education', 'transportation', 'help'],
    defaultTab: 'help',
    resources: []
  };

  var collection = req.db.get('resources');
  collection.find({type: resources.defaultTab},{}, function(e, data) {
    resources.resources = data;
    //console.log(resources);
    res.render('resourcespage', resources);
  });
});

router.post('/addcomment/:tagId', function(req, res) {
  var collection = req.db.get('resources');
  var id = collection.id(req.params.tagId);
  console.log("adding comment");
  console.log(req.body);
  collection.insert({
    resourceID: id,
    text: req.body.commentText
  }, function(err, data) {
    if (err) {
      res.send('gg');
    } else {
      res.send(data);
    }
  });
});

module.exports = router;