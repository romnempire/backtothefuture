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
    collection = req.db.get('resourcecomments');
    resources.resources = data;
    console.log("the following is passed into accumulate");
    console.log(resources.resources[0]);
    accumulate('cat', resources.resources[0], 1);
    console.log(data[0]._id);
    //res.render('resourcespage', resources);
  });

  var accumulate = function(e, datum, nextIndex) {
    if (nextIndex-1 >= resources.resources.length) {
      console.log(resources);
      res.render('resourcespage', resources);
    } else {
      console.log('the following is what was passed in from the inside');
      console.log(datum);
      collection.find({resourceID: resources.resources[nextIndex-1]._id}, {}, function(err, data) {
        resources.resources[nextIndex-1].comments = data;
        accumulate(e, data[nextIndex], nextIndex+1 );
      });
    }
  }
});

router.post('/addcomment/:tagId', function(req, res) {
  var collection = req.db.get('resourcecomments');
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

router.post('/addresource', function(req, res) {
  var collection = req.db.get('resources');
  collection.insert({
    name: req.body.name,
    address:  req.body.address,
    type: req.body.type,
    description: req.body.description,
    rating: 50,
    date: new Date()
  }, function(err, data) {
    if (err) {
      res.send('gg');
    } else {
      res.send(data);
    }
  });
});

module.exports = router;