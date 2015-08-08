var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var resources = {
    tabs: ['work', 'housing', 'food', 'education', 'transportation'],
    defaultTab: 'work',
    resources: []
  };

  var collection = req.db.get('resources');
  collection.find({},{}, function(e, data) {
    console.log(data);

    resources.resources = data;
    res.render('resources', resources);
  });
});

module.exports = router;