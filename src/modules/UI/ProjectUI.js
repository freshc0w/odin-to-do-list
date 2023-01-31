import TaskUI from "./TaskUI";

class ProjectUI {
	constructor(projectObj) {
		this.project = projectObj;
	}
	draw() {
		const mainContent = document.querySelector("#main-content");
		this.clear(mainContent);

		// Loop through all the tasks and give it a TaskUI class.
		// Use the draw method to get the div container and append it to
		// mainContent container.
		this.drawTasks(mainContent, this.project.tasks);

		const addTaskOption = this.addTaskOption();
		mainContent.appendChild(addTaskOption);
	}
	addTaskOption() {
		// Draw an add task option beneath all tasks
		const addTaskContainer = document.createElement("div");
		addTaskContainer.classList.add("task-container");
		addTaskContainer.classList.add("add");

		const addTaskBtn = document.createElement("button");
		addTaskBtn.classList.add("uniqueBtn");
		addTaskBtn.classList.add("alter");
		addTaskBtn.classList.add("addTask");

		// const addSymbolDiv = document.createElement("div");
		// const addSymbol = document.createElement('i');
		// addSymbol.classList.add("material-icons");
		// addSymbol.textContent = "add_circle";

		// addSymbolDiv.appendChild(addSymbol);
		// addTaskBtn.append(addSymbolDiv);
		addTaskBtn.innerHTML = '<i class="material-icons">add_task</i>ADD TASK';

		// addTaskBtn.textContent = "ADD";

		addTaskContainer.appendChild(addTaskBtn);
		return addTaskContainer;
	}
	drawTasks(container, tasks) {
		for (let task of tasks) {
			const taskDisplay = new TaskUI(task);
			container.appendChild(taskDisplay.draw());
		}
	}

	clear(content) {
		content.innerHTML = "";
	}

	completeTask() {
		// Make task container transparent after completing task.
		const checkBox = document.getElementById();
	}
}

export { TaskUI, ProjectUI };
