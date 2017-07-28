function HttpService() {
    this.apiBaseUrl = location.protocol + '//' + location.host + '/api/';
}

HttpService.prototype.getProjects = function () {
    return $.getJSON(this.apiBaseUrl + "GetProjects").promise();
}

HttpService.prototype.getChartData = function () {
    return $.getJSON(this.apiBaseUrl + "GetChartData").promise();
}

HttpService.prototype.sendEmail = function (data) {
    return $.post(this.apiBaseUrl + "SendEmail", data).promise();
}

module.exports = new HttpService();