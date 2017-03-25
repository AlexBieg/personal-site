$ = JQuery = require('jquery');
require('jquery-match-height');
var ChartHandler = require('./chart-handler.js');

// Json Requires
var chartData = require('../data/chart-data.json');


//========================
// Constants
//=======================
var apiBaseUrl = location.protocol + '//' + location.host + '/api/';


$(document).ready(function() {
    //set up
    buildCharts();
    displayProjects();
});

function buildCharts() {
    var chart = new ChartHandler($(".skill-chart"), chartData.data[0]);
    chart.buildChart();
    var chart2 = new ChartHandler($(".tech-chart"), chartData.data[1]);
    chart2.buildChart();
}

function displayProjects() {
    $.getJSON(apiBaseUrl + "GetProjects", function(resp) {
        showProjects(resp.projects);
    });
}

function showProjects(projects) {
    var projectsDiv = $(".projects");
    for (var i = 0; i < projects.length; i++) {
        var projectContainer = $('<div>');
        projectContainer.addClass('project-container col sm12 m6 l4');

        var newProject = $("<div>");
        newProject.addClass("project hvr-bounce-to-bottom");

        var link = $('<a>');
        link.attr('href', projects[i].link);

        var title = $('<h4>');
        title.text(projects[i].title);
        newProject.append(title);

        var desc = $('<p>');
        desc.text(projects[i].desc);
        newProject.append(desc);

        var img = $('<img>');
        img.addClass("circle");
        img.attr('src', projects[i].img);
        newProject.append(img);

        var ul = $('<ul>');
        for (var j = 0; j < projects[i].technologies.length; j++) {
            ul.append($('<li>').text(projects[i].technologies[j]));
        }
        newProject.append(ul);

        link.append(newProject);

        projectContainer.append(link);

        projectsDiv.append(projectContainer);
    }
}
