var express = require('express');
var router = express.Router();

router.get('/', function(request, response){
    //response.send('This is home page');
    response.render('home/index');
});

module.exports = router;
