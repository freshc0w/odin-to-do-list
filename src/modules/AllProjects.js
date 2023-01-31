import Project from "./project";

export default class AllProjects {
	constructor() {
		this.projects = [];
		["Inbox", "Today", "This Week", "Important"].forEach((proj) => {
			this.projects.push(new Project(proj));
		});
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
		// Iterate thru each project and use getTasksToday() on each.
		return this.projects.reduce(
			(acc, project) => [...acc, ...project.getTasksToday()],
			[]
		);
	}
	getAllTasksThisWeek() {
		return this.projects.reduce(
			(acc, project) => [...acc, ...project.getTasksThisWeek()],
			[]
		);
	}
	getAllImportantTasks() {
		return this.projects.reduce(
			(acc, project) => [...acc, ...project.getImportantTasks()],
			[]
		);
	}
}
