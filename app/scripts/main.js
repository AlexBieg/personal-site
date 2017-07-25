$ = JQuery = require('jquery');
const validation = require("jquery-validation");
require('jquery-match-height');
var ChartHandler = require('./chart-handler.js');

// Json Requires
var chartData = require('../data/chart-data.json');


//========================
// Constants
//=======================
var apiBaseUrl = location.protocol + '//' + location.host + '/api/';


$(document).ready(function () {
    //set up
    buildCharts();
    displayProjects();
    setHandlers();
    validateForms();
});

function validateForms() {
    $("#email-form").validate({
        rules: {
            first_name: {
                required: true
            },
            last_name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            subject: {
                required: true
            },
            body: {
                required: true,
                minlength: 10
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
        }
    });
}

function setHandlers() {
    $(".submit-email").click(function () {
        var data = {
            email: $("#email").val(),
            name: $("#first_name").val() + " " + $("#last_name").val(),
            subject: $("#subject").val(),
            body: $("#body").val()
        };

        $(".preloader-wrapper").show();

        $.post(apiBaseUrl + "SendEmail", data, function (resp) {
            console.log(resp);
            $("#email-form")[0].reset();
            $(".preloader-wrapper").hide();
            $(".submit-email").prop("disabled", "disabled");
        });
    });

    $("#email-form input").on("keyup blur", checkButton);
    $("#email-form textarea").on("keyup blur", checkButton);
}

function checkButton() {
    if ($("#email-form").valid()) {
        $(".submit-email").prop("disabled", false);
    } else {
        $(".submit-email").prop("disabled", "disabled");
    }
}

function buildCharts() {
    var chart = new ChartHandler($(".skill-chart"), chartData.data[0]);
    chart.buildChart();
    var chart2 = new ChartHandler($(".tech-chart"), chartData.data[1]);
    chart2.buildChart();
}

function displayProjects() {
    $.getJSON(apiBaseUrl + "GetProjects", function (resp) {
        showProjects(resp.projects);
    });
}

function showProjects(projects) {
    var projectsDiv = $(".projects");
    for (var i = 0; i < projects.length; i++) {
        var newProject = $("<div>");
        newProject.addClass("project hvr-bounce-to-bottom");

        var img = $('<img>');
        img.addClass("circle");
        img.attr('src', "img/" + projects[i].img);
        newProject.append(img);

        var title = $('<h4>');
        title.text(projects[i].title);
        newProject.append(title);

        var desc = $('<p>');
        desc.text(projects[i].desc);
        newProject.append(desc);

        var ul = $('<ul>');
        for (var j = 0; j < projects[i].technologies.length; j++) {
            ul.append($('<li>').text(projects[i].technologies[j]));
        }

        newProject.append(ul);

        var link = $('<a>');
        link.attr('href', projects[i].link);

        link.append(newProject);

        projectsDiv.append(newProject);
    }
}
