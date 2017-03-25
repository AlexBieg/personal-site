var fs = require('fs');

var projectsPath = "./data/projects.json";

function getProjects() {
    return JSON.parse(fs.readFileSync(projectsPath));
}

module.exports = getProjects;
