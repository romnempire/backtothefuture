var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var resources = {
    tabs: ['work', 'housing', 'food', 'education', 'transportation'],
    defaultTab: 'work',
    resources: [{
        id: 'catresource',
        name: 'free cats',
        address: '101 Dalmation Ln.',
        createDate: new Date(),
        comments: [{
            body: 'they taste good',
            createDate: new Date()
          }
        ]
      }
    ]
  };
  res.render('resources', resources);
});

module.exports = router;