var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+"/app"));

app.use('/scripts', express.static(__dirname + "/node_modules/"));

app.get('/', function(req, res) {
    res.render("index.html");
});

app.listen(app.get('port'), function() {
    console.log("Listening on port ", app.get('port'));
});
