var express = require('express');
var app = express();
var getProjects = require('./api/getProjects.js');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+"/app"));


// Frontend
app.get('/', function(req, res) {
    res.render("index.html");
});


// API
app.get('/api/GetProjects', function(req, res) {
    var projectsJson = getProjects();
    res.json(projectsJson);
});

app.listen(app.get('port'), function() {
    console.log("Listening on port ", app.get('port'));
});
