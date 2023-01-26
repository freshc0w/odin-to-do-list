import Task from "../task";
import Project from "../project";

class TaskUI {
	// Purpose of this class it to take in a task obj, and turn it into
	// a div with all relevant information regarding the task.
	// From left-to-right: [checkBox, name, details, priority, date, editIcon, binIcon]
	constructor(taskObj) {
		this.task = taskObj;
	}
	renderInfo(elem, addedClass, text = "") {
		const name = document.createElement(elem);
		name.classList.add(addedClass);
		name.textContent = text; // default empty str

		return name;
	}
	createElements(taskContainer) {
		const statusCheck = this.renderInfo("input", "statusCheck");
		statusCheck.setAttribute("type", "checkbox");
		statusCheck.setAttribute("id", "statusCheck");
		statusCheck.addEventListener("change", (event) => {
			if (event.target.checked) {
				taskContainer.style.opacity = "40%";
				// taskContainer.style.transform = 'scale(0.985)';
			} else {
				taskContainer.style.opacity = "100%";
				// taskContainer.style.transform = 'scale(1)';
			}
		});

		const name = this.renderInfo("div", "taskName", this.task.name);

		// When clicked, pop up a form where the details of the task is displayed.
		const detailsBtn = this.renderInfo("button", "uniqueBtn", "Details");
		detailsBtn.classList.add("details");

		// Priority icon
		const priority = this.renderInfo("div", "statusPrio");
		const priorityIcon = this.renderInfo("i", "material-icons", "warning");

		// Change color based on priority of task -> ['high', 'medium', 'low']
		priorityIcon.classList.add(this.task.priority);
		priority.appendChild(priorityIcon);

		// Just a mock date for now. Subject to change based on user input.
		// const timeElapsed = Date.now();
		// const today = new Date(timeElapsed);
		// const date = this.renderInfo(
		// 	"div",
		// 	"taskDate",
		// 	`${today.toLocaleDateString()}`
		// );

		const date = this.renderInfo(
			"div",
			"taskDate",
			this.task.dueDateFormatted
		)

		// icons
		const edit = this.renderInfo("div", "taskEdit");
		const editIcon = this.renderInfo("i", "material-icons", "edit");
		edit.appendChild(editIcon);

		const taskDel = this.renderInfo("div", "taskDel");
		const delIcon = this.renderInfo("i", "material-icons", "delete");
			
		// Add class identifer.
		taskDel.classList.add(this.task.id);

		// Create Dataset??
		// delIcon.dataset.id = this.task.id;

		taskDel.appendChild(delIcon);

		return [statusCheck, name, detailsBtn, priority, date, edit, taskDel];
	}
	draw() {
		const taskContainer = this.renderInfo("div", "task-container");
		const elems = this.createElements(taskContainer);
		for (let elem of elems) {
			taskContainer.appendChild(elem);
		}
		return taskContainer;
	}
}

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
        addTaskBtn.classList.add("add");
        addTaskBtn.textContent = "ADD";
    
        addTaskContainer.appendChild(addTaskBtn);
        return addTaskContainer
        
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
