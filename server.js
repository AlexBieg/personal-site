var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var getProjects = require('./api/getProjects.js');
var getChartData = require('./api/getChartData.js');
var sendEmail = require('./api/sendEmail.js');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+"/app"));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));


// Frontend
app.get('/', function(req, res) {
    res.render("index.html");
});

// API
app.get('/api/GetProjects', function(req, res) {
    var projectsJson = getProjects();
    res.json(projectsJson);
});

app.get('/api/GetChartData', function(req, res) {
    var chartDataJson = getChartData();
    res.json(chartDataJson);
});

app.post('/api/SendEmail', function(req, res) {
    sendEmail(req.body).then(function() {
        res.sendStatus(200);
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);
    });
});

// App start
app.listen(app.get('port'), function() {
    console.log("Listening on port " + app.get('port') + "....");
});
