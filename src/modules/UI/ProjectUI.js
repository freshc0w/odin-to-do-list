import TaskUI from "./TaskUI";

class ProjectUI {
	constructor(projectObj) {
		this.project = projectObj;
	}
	draw() {
		const mainContent = document.querySelector("#main-content");
		this.clearContent(mainContent);
		this.drawTasks(mainContent);
		mainContent.appendChild(this.addTaskOption());
	}
	addTaskOption() {
		// Draw an add task option beneath all tasks
		const addTaskContainer = document.createElement("div");
		addTaskContainer.className = "task-container add";

		const addTaskBtn = document.createElement("button");
		addTaskBtn.className = "uniqueBtn alter addTask";
		addTaskBtn.innerHTML = '<i class="material-icons">add_task</i>ADD TASK';

		addTaskContainer.appendChild(addTaskBtn);
		return addTaskContainer;
	}

	drawTasks(container) {
		this.project.tasks.forEach((task) => {
			const taskDisplay = new TaskUI(task);
			container.append(taskDisplay.draw());
		});
	}

	clearContent(content) {
		while (content.firstChild) content.removeChild(content.firstChild);
	}
}

export { TaskUI, ProjectUI };
