import Task from "../task";
import Project from "../project";
import format from "date-fns/format";
import { DrawForm } from "./form";

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

		// Check if task has already been checked off before.
		if (this.task.status) {
			statusCheck.checked = true;
			taskContainer.style.opacity = "35%";
		}

		statusCheck.addEventListener("change", (event) => {
			if (event.target.checked) {
				this.task.status = true;
				taskContainer.style.opacity = "35%";
				// taskContainer.style.transform = 'scale(0.985)';
			} else {
				this.task.status = false;
				taskContainer.style.opacity = "100%";
				// taskContainer.style.transform = 'scale(1)';
			}
		});

		const name = this.renderInfo("div", "taskName", this.task.name);

		// When clicked, pop up a form where the details of the task is displayed.
		const detailsBtn = this.renderInfo("button", "uniqueBtn", "Details");
		detailsBtn.classList.add("details");
		detailsBtn.addEventListener("click", () => {
			this.drawDetailsPopUp(this.task);
		});

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

		const date = this.renderInfo("div", "taskDate", this.task.dueDateFormatted);

		// icons
		const edit = this.renderInfo("div", "taskEdit");
		const editIcon = this.renderInfo("i", "material-icons", "edit");
		// Add unique id identifer based on task id for bin icon
		// for individual task edits.
		edit.setAttribute("id", `editTask-${this.task.id}`);
		edit.appendChild(editIcon);

		// editIcon.addEventListener("click", () => {
		// 	this.editDetailsPopUp(this.task);
		// });

		const taskDel = this.renderInfo("div", "taskDel");
		const delIcon = this.renderInfo("i", "material-icons", "delete");

		// Add unique id identifer based on task id for bin icon.
		taskDel.setAttribute("id", `delTask-${this.task.id}`);

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
	// Details Btn Functionality
	drawDetailsPopUp(task) {
		this.addPopUp();
		this.drawDetails(task);

		this.addCloseFormBtn();
	}
	drawDetails(task) {
		const taskName = document.createElement("p");
		const taskDescription = document.createElement("p");
		const taskDueDate = document.createElement("p");
		const taskPriority = document.createElement("p");
		const dateFormat = format(new Date(task.dueDateFormatted), "dd/MM/yyyy");

		taskName.textContent = `Task Name: "${task.name}"`;
		taskDescription.textContent = `Task Details: "${task.description}"`;
		taskDueDate.textContent = `Task Due Date: "${dateFormat}"`;
		taskPriority.textContent = `Task Priority: "${task.priority}"`;

		taskPriority.style.textTransform = "capitalize";
		taskName.style.fontWeight = "900";

		for (let info of [taskName, taskDescription, taskDueDate, taskPriority]) {
			info.classList.add("taskDetails");
			document.querySelector(".form-container").appendChild(info);
		}
	}
	//Edit Btn Functionality
	editDetailsPopUp(task) {
		this.addPopUp();
		this.editDetails(task);
		this.addEditDetailsBtn(task);

		this.addCloseFormBtn();
	}
	editDetails(task) {
		// Draw initial form that adds a task and replace all values with
		// current task's info.
		const currentForm = DrawForm();
		currentForm.addTask();

		document.getElementById("inputTaskTitle").defaultValue = task.name;
		document.getElementById("inputTaskDetails").defaultValue = task.description;

		const prioLevel = task.priority.substr(0, 3);
		if (prioLevel === "med" || prioLevel === "low") {
			document.getElementById(`${prioLevel}Prio`).checked = true;
		} else {
			document.getElementById("highPrio").checked = true;
		}

		document.getElementById("inputDueDate").value = task.dueDate
			.split("/")
			.reverse()
			.join("-");
	};
	addEditDetailsBtn(task) {
		// Change appendTask btn to edit task btn
		const editDetails = document.querySelector('.appendTaskBtn');
		editDetails.textContent = "Edit Task";

		// Change current task's details to input's new values 
		// when click event executes
		editDetails.addEventListener("click", (event) => {
			task.name = document.getElementById("inputTaskTitle").value;

			document.querySelector('form').style.visibility = "hidden";
			document.querySelector('.face-mask').style.visibility = "hidden";
			event.preventDefault();
		})

	}
	addPopUp() {
		const currentForm = DrawForm();
		currentForm.clear();
		document.querySelector("form").style.visibility = "visible";
		document.querySelector(".face-mask").style.visibility = "visible";
	}
	addCloseFormBtn() {
		const closeFormBtn = document.createElement("img");
		closeFormBtn.classList.add("closeFormBtn");
		closeFormBtn.src = "../../../imgs/mac-close-btn.png";
		closeFormBtn.alt = "A button that closes the form.";
		closeFormBtn.addEventListener("click", () => {
			document.querySelector("form").style.visibility = "hidden";
			document.querySelector(".face-mask").style.visibility = "hidden";
		});
		document.querySelector(".form-container").appendChild(closeFormBtn);
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
