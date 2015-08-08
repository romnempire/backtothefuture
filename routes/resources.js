var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var resources = {
    tabs: ['work', 'housing', 'food', 'education', 'transportation'],
    defaultTab: 'work',
    resources: [{
        id: 'catresource',
        name: 'free dogs',
        address: '101 Meowton Ave.',
        createDate: new Date(),
        comments: [{
            body: 'they taste good',
            createDate: new Date()
          }
        ]
      }
    ]
  };

  var collection = req.db.get('resources');
  collection.find({},{}, function(e, data) {
    console.log(data);

    resources.resources[0].id = data[0]._id;
    resources.resources[0].name = data[0].name;
    resources.resources[0].address = data[0].address;

    res.render('resources', resources);
  });
});

module.exports = router;


/*
function(err, data) {

    console.log('cats');
    console.log(data);

    resources.resources[0].id = data[0]._id;
    resources.resources[0].name = data[0].name;
    resources.resources[0].address = data[0].address;

    res.render('resources', resources);
  }
*/