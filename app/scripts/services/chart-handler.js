var Chart = require('chart.js');


// Defaults
Chart.defaults.global.defaultFontColor = "#FFFFFF";
Chart.defaults.global.defaultFontSize = 10;

function ChartHandler(elem, data) {
    this.elem = elem;
    this.data = data;
}

ChartHandler.prototype.buildChart = function() {
    return new Chart(this.elem, {
        type: 'radar',
        data: this.data,
        options: {
            legend: {
                display: false
            },
            scale: {
                ticks: {
                    showLabelBackdrop: false,
                    min: 0,
                    max: 100,
                    stepSize: 20
                },
                pointLabels: {
                    fontSize: 15
                }
            }
        }
    });
};

module.exports = ChartHandler;
