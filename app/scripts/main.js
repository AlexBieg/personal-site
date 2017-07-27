$ = JQuery = require('jquery');
const validation = require("jquery-validation");
require('jquery-match-height');
const ChartHandler = require('./chart-handler.js');

// Json Requires
const chartData = require('../data/chart-data.json');

//========================
// Constants
//========================
const apiBaseUrl = location.protocol + '//' + location.host + '/api/';

$(document).ready(function () {
    //set up
    buildCharts();
    displayProjects();
    setHandlers();
    validateForms();
});

/**
 * Set up form validation
 */
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
            let placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
        }
    });
}

/**
 * Sets up all of the handlers for the page
 */
function setHandlers() {
    // Email submit 
    $(".submit-email").click(function () {
        let data = {
            email: $("#email").val(),
            name: $("#first_name").val() + " " + $("#last_name").val(),
            subject: $("#subject").val(),
            body: $("#body").val()
        };

        $(".preloader-wrapper").show();

        $.post(apiBaseUrl + "SendEmail", data, function (resp) {
            $(".preloader-wrapper").hide();
            $("#email-form")[0].reset();
            $(".submit-email").prop("disabled", "disabled");
            $(".email-success").text("Your email was sent!")
            $(".email-error").text("")
        }).fail(function (err) {
            $(".preloader-wrapper").hide();
            $(".email-error").text("Something went wrong. Please try again later.")
            $(".email-success").text("");
        });
    });

    // Button disable checks
    $("#email-form input").on("keyup blur", checkButton);
    $("#email-form textarea").on("keyup blur", checkButton);
}

/**
 * Check if the button should be disabled or not
 */
function checkButton() {
    if ($("#email-form").valid()) {
        $(".submit-email").prop("disabled", false);
    } else {
        $(".submit-email").prop("disabled", "disabled");
    }
}

/**
 * Builds all of the charts
 */
function buildCharts() {
    let chart = new ChartHandler($(".skill-chart"), chartData.data[0]);
    chart.buildChart();
    let chart2 = new ChartHandler($(".tech-chart"), chartData.data[1]);
    chart2.buildChart();
}

/**
 * Gets the projects from the api
 */
function displayProjects() {
    $.getJSON(apiBaseUrl + "GetProjects", function (resp) {
        showProjects(resp.projects);
    });
}

/**
 * Adds the projects to the page
 * @param {Array} projects 
 */
function showProjects(projects) {
    let projectsDiv = $(".projects");
    for (let i = 0; i < projects.length; i++) {
        let link = $('<a>');
        link.attr('href', projects[i].link);

        let newProject = $("<div>");
        newProject.addClass("project hvr-bounce-to-bottom");

        let img = $('<img>');
        img.addClass("circle");
        img.attr('src', "img/" + projects[i].img);
        link.append(img);

        let title = $('<h4>');
        title.text(projects[i].title);
        link.append(title);

        let desc = $('<p>');
        desc.text(projects[i].desc);
        link.append(desc);

        let ul = $('<ul>');
        for (let j = 0; j < projects[i].technologies.length; j++) {
            ul.append($('<li>').text(projects[i].technologies[j]));
        }

        link.append(ul);

        newProject.append(link);

        projectsDiv.append(newProject);
    }
}