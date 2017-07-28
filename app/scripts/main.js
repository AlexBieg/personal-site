$ = JQuery = require('jquery');
const validation = require("jquery-validation");

// Services
const HttpService = require('./services/http-service.js')
const ChartHandler = require('./services/chart-handler.js');
const ProjectsHandler = require('./services/projects-handler.js');

$(document).ready(function () {
    //set up
    buildCharts();
    buildProjects();
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

        HttpService.sendEmail(data).then(function (resp) {
            $(".preloader-wrapper").hide();
            $("#email-form")[0].reset();
            $(".submit-email").prop("disabled", "disabled");
            $(".email-success").text("Your email was sent!")
            $(".email-error").text("")
        }).catch(function (err) {
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
    HttpService.getChartData().then(function (resp) {
        showCharts(resp.data);
    });
}

function showCharts(chartData) {
    let chart = new ChartHandler($(".lang-chart"), chartData.lang);
    chart.buildChart();
    let chart2 = new ChartHandler($(".tech-chart"), chartData.tech);
    chart2.buildChart();
}

/**
 * Gets the projects from the api
 */
function buildProjects() {
    HttpService.getProjects().then(function (resp) {
        let ph = new ProjectsHandler($(".projects"), resp.projects);
        ph.showProjects();
    });
}