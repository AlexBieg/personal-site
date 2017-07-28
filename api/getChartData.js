var fs = require('fs');

var chartDataPath = "./data/chart-data.json";

function getChartData() {
    return JSON.parse(fs.readFileSync(chartDataPath));
}

module.exports = getChartData;