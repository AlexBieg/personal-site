
function ProjectsHandler(container, projects) {
    this.container = container;
    this.projects = projects
}

ProjectsHandler.prototype.showProjects = function() {
    for (let i = 0; i < this.projects.length; i++) {
        let project = this.projects[i];

        let link = $('<a>');
        link.attr('href', project.link);

        let newProject = $("<div>");
        newProject.addClass("project hvr-bounce-to-bottom");

        let title = $('<h4>');
        title.text(project.title);
        link.append(title);

        let desc = $('<p>');
        desc.text(project.desc);
        link.append(desc);

        link.append($('<hr />'));

        let ul = $('<ul>');
        for (let j = 0; j < project.technologies.length; j++) {
            ul.append($('<li>').text(project.technologies[j]));
        }

        link.append(ul);

        newProject.append(link);

        this.container.append(newProject);
    }
}

module.exports = ProjectsHandler;