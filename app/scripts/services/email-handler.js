function EmailHandler() {}

EmailHandler.prototype.sendingEmail = function () {
    $(".preloader-wrapper").show();
}

EmailHandler.prototype.emailFailed = function () {
    $(".preloader-wrapper").hide();
    $(".email-error").text("Something went wrong. Please try again later.")
    $(".email-success").text("");
}

EmailHandler.prototype.emailSucceeded = function () {
    $(".preloader-wrapper").hide();
    $("#email-form")[0].reset();
    $(".submit-email").prop("disabled", "disabled");
    $(".email-success").text("Your email was sent!")
    $(".email-error").text("")
}


module.exports = EmailHandler;