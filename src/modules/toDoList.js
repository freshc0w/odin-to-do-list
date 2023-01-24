import Task from "./task";
import Project from "./project";

export default class toDoList {
    constructor() {
        this.projects = [];
    };

    get projects() {
        return this.projects;
    };

    // Check if project name exists in list of projects.
    contains(projectName) {
        return this.projects.some(project => project.name === projectName);
    };

    getProject(projectName) {
        return this.projects.find(project => project.name === projectName);
    };

    addProject(newProjectName) {
        // Cannot have same project names.
        if (this.contains(newProjectName)) return;
        this.projects.push(new Project(newProjectName));
    };

    deleteProject(projectName) {
        const projectToDelete = this.projects.find(project => 
                                project.name === projectName);
        this.projects.splice(this.projects.indexOf(projectToDelete),
                                1)
    };

    // Can add today's and this week's functionality.
};