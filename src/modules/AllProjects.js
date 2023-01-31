import Task from "./task";
import Project from "./project";

export default class AllProjects {
	constructor() {
		//map all the project names to create Project instances.
		let projects = ["Inbox", "Today", "This Week", "Important"].map(
			(proj) => new Project(proj)
		);

		//assign the mapped projects to the `projects` property of the class
		this.projects = projects;
	}

	get projects() {
		return this._projects;
	}
	set projects(value) {
		this._projects = value;
	}

	// Check if project name exists in list of projects.
	contains(projectName) {
		return this.projects.some((project) => project.name === projectName);
	}

	getProject(projectName) {
		return this.projects.find((project) => project.name === projectName);
	}

	addProject(newProjectName) {
		// Cannot have same project names.
		if (this.contains(newProjectName)) return;
		this._projects.push(new Project(newProjectName));
	}

	deleteProject(projectName) {
		const projectToDelete = this.projects.find(
			(project) => project.name === projectName
		);
		this.projects.splice(this.projects.indexOf(projectToDelete), 1);
	}
	getAllTasksToday() {
		return this.getProject("Inbox").getTasksToday();
	}

	getAllTasksThisWeek = () => {
		return this.getProject("Inbox").getTasksThisWeek();
	};

	getAllImportantTasks() {
		return this.getProject("Inbox").getImportantTasks();
	}
}
