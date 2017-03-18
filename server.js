var express = require('express');
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.listen(app.get('port'), function() {
    console.log("Listening on port ", app.get('port'));
});
