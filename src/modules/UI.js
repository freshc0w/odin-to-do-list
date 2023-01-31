import format from "date-fns/format";
import Task from "./task";
import AllProjects from "./AllProjects";
import { ProjectUI } from "./UI/ProjectUI";
import { DrawForm } from "./UI/FormUI";

export default class UI {
	constructor() {
		this.toDoList = new AllProjects();

		// Initialise first homePage to be on the "Inbox" page.
		this.currentProjectPage = "Inbox";
		this.currentForm = DrawForm();
		this.screen = false;
	}
	get currentProjectPage() {
		return this._currentProjectPage;
	}
	set currentProjectPage(value) {
		this._currentProjectPage = value;
	}
	get toDoList() {
		return this._toDoList;
	}
	set toDoList(value) {
		this._toDoList = value;
	}

	toggleScreen() {
		const main = document.querySelector(".main-container");
		const sideBar = document.getElementById("sideBar");
		const titleText = document.querySelector(".title-page-text");
		if (!this.screen) {
			toggleSize(true);
			this.removeSlideInOut();
			titleText.style.marginRight = "calc(-10rem - 150px)";
			sideBarLarge();
			this.screen = true;
		} else {
			toggleSize(false);
			this.addSlideInOut();
			titleText.style.marginRight = "calc(-10rem - 32.5px)";
			sideBarSmall();
			this.screen = false;
		}
		function sideBarLarge() {
			sideBar.style.width = "300px";
			sideBar.style.paddingLeft = "3rem";
			sideBar.style.boxShadow = "0 12px 8px rgba(255, 255, 255, 0.7)";
			document.querySelectorAll("a").forEach((link) => {
				link.style.transform = "scale(1.2)";
			});
		}
		function sideBarSmall() {
			sideBar.style.width = "65px";
			sideBar.style.paddingLeft = "0";
			sideBar.style.boxShadow = "none";
			document.querySelectorAll("a").forEach((link) => {
				link.style.transform = "none";
			});
		}

		function toggleSize(size) {
			if (size) {
				main.style.height = "100vh";
				main.style.width = "100vw";
				main.style.transform = "translateX(20.5%)";
				main.style.backgroundColor = "rgba(25, 25, 25, 0.95)";
				main.style.backdropFilter = "blur(3px)";
			} else {
				main.style.height = "max(35rem, 82.5%)";
				main.style.width = "max(700px, 90%)";
				main.style.transform = "none";
				main.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
			}
		}
	}

	loadPage(projectName) {
		// We need to reset all ids on all tasks to prevent
		// deletion of two tasks with the same id at once.
		this.toDoList.getProject(projectName).reInitialiseId();

		// Update today's, this week's and important tasks.
		this.updateAllTasks();

		this.drawPage(projectName);

		// Reinitialise add task function for new page's btn.
		this.addTaskFunction(projectName);

		// Apply eventlisteners for each corresponding bin icons.
		this.applyDelAndEditFunc(projectName);

		// Assign functions for the project.
		this.addProjFunction();
		this.addClearAllTasksFunction();
	}

	drawPage(projectName) {
		const projectDisplay = new ProjectUI(this.toDoList.getProject(projectName));
		projectDisplay.draw();

		// Update navBar text displaying project's title page
		const titleText = document.querySelector(".title-page-text");
		titleText.textContent = projectName;

		// Because of date formatting, taskDate style needs to be reInitialised.
		const allDates = document.querySelectorAll(".taskDate");
		allDates.forEach((date) => (date.style.fontSize = "1.3rem"));
	}

	/* Add task Btn functionalities */
	addTaskFunction(projectName) {
		const addTaskBtn = document.querySelector(".uniqueBtn.addTask");
		addTaskBtn.addEventListener("click", () => {
			// Clear any current form and draw the add task form.
			this.currentForm.clear();

			// Need to specify the project name in the addTask to append
			// to the specified project.
			this.currentForm.addTask();
			// Set the default checked radio button to Medium Priority.
			document.getElementById("medPrio").checked = true;

			document.querySelector("form").style.visibility = "visible";
			document.querySelector(".face-mask").style.visibility = "visible";

			// Set default date input to current day.
			inputDueDate.valueAsDate = new Date();

			// Add draw new task functionality to appendTaskBtn on the form.
			const appendTaskBtn = document.querySelector(".uniqueBtn.appendTaskBtn");
			this.submitTaskFunction(appendTaskBtn, projectName);
		});
	}

	addNewTask(projectName, taskInfo) {
		// Add all tasks to Inbox by default.
		this.addTaskTo("Inbox", taskInfo);

		// Prevent adding to Today or This Week's or important projects since
		// they are updated by default.
		const preventAddTask = ["Inbox", "Today", "This Week", "Important"];
		if (!preventAddTask.includes(projectName)) {
			this.addTaskTo(projectName, taskInfo);
		}
	}

	addTaskTo(projectName, taskInfo) {
		this.toDoList
			.getProject(projectName)
			.addTask(
				new Task(
					taskInfo["title"],
					taskInfo["details"],
					taskInfo["date"],
					taskInfo["priority"],
					this.toDoList.getProject(projectName).tasks.length,
					taskInfo["status"]
				)
			);
	}

	submitTaskFunction(btn, projectName) {
		btn.addEventListener("click", (event) => {
			if (document.querySelector("form").checkValidity()) {
				// Create variable to store object of task information
				const taskInfo = this.currentForm.collectTaskInfo();

				// Check if task name has already been used
				let taskNameAlreadyUsed = false;
				for (let project of this.toDoList.projects) {
					for (let task of project.tasks) {
						if (task.name === taskInfo["title"]) {
							taskNameAlreadyUsed = true;
							document
								.getElementById("inputTaskTitle")
								.setCustomValidity(
									"Name has already been used!" +
										"\n Please close and reopen the window!"
								);
							break;
						}
					}
				}
				// If name has not been used add task
				if (!taskNameAlreadyUsed) {
					this.addNewTask(projectName, taskInfo);

					document.querySelector("form").style.visibility = "hidden";
					document.querySelector(".face-mask").style.visibility = "hidden";

					this.loadPage(projectName);
					event.preventDefault();
				}
			}
		});
	}

	/* Add project Btn functionalities */
	addProjFunction() {
		const addProjBtn = document.querySelector(".addProj");
		addProjBtn.addEventListener("click", () => {
			this.currentForm.clear();
			this.currentForm.addProj();

			const form = document.querySelector("form");
			const faceMask = document.querySelector(".face-mask");
			form.style.visibility = "visible";
			faceMask.style.visibility = "visible";
			this.addSubmitProjFunction();
		});
	}
	addSubmitProjFunction() {
		const newProjTitle = document.getElementById("inputProjTitle");
		const submitProjBtn = document.querySelector(".appendProjBtn");

		submitProjBtn.addEventListener("click", (event) => {
			if (document.querySelector("form").checkValidity()) {
				// Add project and submit
				this.toDoList.addProject(newProjTitle.value);

				document.querySelector("form").style.visibility = "hidden";
				document.querySelector(".face-mask").style.visibility = "hidden";

				// Reset sideBar custom Project tabs.
				this.clearProjectTabs();
				this.drawProjectTabs();
				this.loadSwitchPageEvents();

				event.preventDefault();
				this.currentProjectPage = newProjTitle.value;
				this.loadPage(newProjTitle.value), { once: true };
			}
		});
	}
	deleteProjFunction() {
		const deleteBtn = document.querySelector(".deleteProj");
		const mandatoryProj = ["Inbox", "Today", "This Week", "Important"];
		deleteBtn.addEventListener("click", () => {
			if (
				// If there are tasks present in current project page,
				// restrict deletion of project.
				this.toDoList.getProject(this.currentProjectPage).tasks.length > 0 &&
				mandatoryProj.includes(this.currentProjectPage)
			) {
				return;
			}
			this.toDoList.deleteProject(this.currentProjectPage);
			this.clearProjectTabs();
			this.drawProjectTabs();
			this.loadSwitchPageEvents();
			this.currentProjectPage = "Inbox";
			this.loadPage("Inbox");
		});
	}

	/* Remove tasks Btn functionalities */
	removeTaskFunction(projectName, taskId) {
		// Add unique delete task functions for each
		// existing taskUI based on task id.
		const delImg = document.getElementById(`delTask-${taskId}`);
		let taskName = this.toDoList
			.getProject(projectName)
			.getTaskNameById(taskId);

		delImg.addEventListener("click", () => {
			// Deletion of a task will remove the same task in other projects.
			this.toDoList.projects.forEach((project) =>
				project.tasks.find((task) =>
					task.name === taskName ? project.deleteTask(task.id) : ""
				)
			);

			this.loadPage(projectName);
		});
	}
	applyDelAndEditFunc(projectName) {
		// For all the tasks in the project, add removeTask and editTask
		// functionality for each task.
		this.toDoList.getProject(projectName).tasks.map((task) => {
			this.removeTaskFunction(projectName, task.id);
			this.editTaskFunction(projectName, task.id);
		});
	}

	/* Edit Btn functionalities */
	editTaskFunction(projectName, taskId) {
		const editIcon = document.getElementById(`editTask-${taskId}`);
		let taskName = this.toDoList
			.getProject(projectName)
			.getTaskNameById(taskId);
		const currentToDoList = this.toDoList;
		editIcon.addEventListener("click", () => {
			this.currentForm.clear();
			this.currentForm.addTask();

			document.querySelector("form").style.visibility = "visible";
			document.querySelector(".face-mask").style.visibility = "visible";

			// Find specified task based on given id to editIcon.
			let selectedTask, selectedTaskName;
			for (let task of this.toDoList.getProject(this.currentProjectPage)
				.tasks) {
				if (task.id === taskId) {
					selectedTask = task;

					// Collect name to change other project's same task.
					selectedTaskName = task.name;
				}
			}

			collectEditDetails(selectedTask);

			// Check all projects that has the specified task so the edits
			// are applied throughout rather than one individual project.
			addEditDetailsBtn();
		});

		const collectEditDetails = (task) => {
			document.getElementById("inputTaskTitle").defaultValue = task.name;
			document.getElementById("inputTaskDetails").defaultValue =
				task.description;

			let prioLevel = task.priority.substr(0, 3);
			switch (prioLevel) {
				case "med":
				case "low":
					document.getElementById(`${prioLevel}Prio`).checked = true;
					break;
				default:
					document.getElementById("highPrio").checked = true;
					break;
			}

			document.getElementById("inputDueDate").value = task.dueDate
				.split("/")
				.reverse()
				.join("-");
		};

		const addEditDetailsBtn = () => {
			// Change appendTask btn to edit task btn
			const editDetails = document.querySelector(".appendTaskBtn");
			editDetails.textContent = "Edit Task";

			// Change current task's details to input's new values
			// when click event executes
			editDetails.addEventListener("click", (event) => {
				changeDetailsToAll(taskName);

				document.querySelector("form").style.visibility = "hidden";
				document.querySelector(".face-mask").style.visibility = "hidden";

				this.loadPage(this.currentProjectPage);
				event.preventDefault();
			});
		};

		/* change task details based on user input */
		const changeDetails = (task) => {
			task.name = document.getElementById("inputTaskTitle").value;
			task.description = document.getElementById("inputTaskDetails").value;
			const prioChosen = document.querySelector('input[name="prio"]:checked');
			task.priority = prioChosen.value;
			const dueDate = document.querySelector("#inputDueDate");
			const dateFormat = format(new Date(dueDate.value), "dd/MM/yyyy");
			task.dueDate = dateFormat;
		};

		const changeDetailsToAll = (taskName) => {
			// Find the specified task in all projects.
			currentToDoList.projects.forEach((proj) => {
				proj.tasks.forEach((task) => {
					if (task.name === taskName) {
						changeDetails(task);
					}
				});
			});
		};
	}

	/* Switch Delete Project or Clear Tasks functionality depending on 
	 	current project page.*/
	addClearAllTasksFunction() {
		const clearAllTaskBtn = document.querySelector(".uniqueBtn.clear");
		clearAllTaskBtn.addEventListener("click", () => {
			const currentProject = this.toDoList.getProject(this.currentProjectPage);

			// Record deleted task names.
			const deletedTasks = currentProject.tasks.map(({ name }) => name);

			// Delete all tasks from current project.
			currentProject.tasks.forEach(({ id }) => currentProject.deleteTask(id));

			// Sync deleted tasks to other projects.
			this.toDoList.projects.forEach((project) =>
				project.tasks.forEach(
					({ name, id }) =>
						deletedTasks.includes(name) && project.deleteTask(id)
				)
			);

			// Reload current project page.
			this.loadPage(this.currentProjectPage);
		});
	}

	/* Update today's, this week's and important tasks based on existing
	or addition of new tasks. */
	updateAllTasks() {
		const allTasksBySet = {
			Today: this.toDoList.getAllTasksToday(),
			"This Week": this.toDoList.getAllTasksThisWeek(),
			Important: this.toDoList.getAllImportantTasks(),
		};

		// Clear all set tasks before redrawing.
		this.clearTaskForSetProj();

		for (let projectName in allTasksBySet) {
			const project = this.toDoList.getProject(projectName);

			for (let task of allTasksBySet[projectName]) {
				// Skip if task is already in the project tasks.
				if (project.tasks.includes(task)) continue;

				project.addTask(task);
			}
		}
	}

	clearTaskForSetProj() {
		// Clears all tasks for today's, this week's and important projects.
		const setProj = ["Today", "This Week", "Important"];
		this.toDoList.projects
			.filter((project) => setProj.includes(project.name))
			.forEach((proj) => (proj.tasks.length = 0));
	}

	/* SideBar functionalities */
	loadSideBar() {
		this.addSlideInOut();
		this.drawInboxTabs();
		this.drawProjectTabs();
		this.loadSwitchPageEvents();
	}

	drawInboxTabs() {
		// Add today and this week's task beneath Inbox tab sidebar.
		const inboxTabs = document.createElement("ul");
		const inboxBar = document.querySelector(".inbox-bar");

		this.addTab(inboxTabs, "Today");
		this.addTab(inboxTabs, "This Week");

		inboxBar.appendChild(inboxTabs);
		this.addDropDownMenu(inboxBar, inboxTabs);
	}

	// Optimize the following code:
	drawProjectTabs() {
		// Find all other projects.
		const inboxProjects = ["Inbox", "Today", "This Week", "Important"];
		const customProjects = this.toDoList.projects.filter(
			(project) => !inboxProjects.includes(project.name)
		);

		const projectTabs = document.createElement("ul");
		projectTabs.classList.add("customProj");

		// Add tabs to projectTabs
		customProjects.forEach((project) => this.addTab(projectTabs, project.name));

		// Append the projectTabs to the projectBar and add a dropdown menu
		const projectBar = document.querySelector(".project-bar");
		projectBar.appendChild(projectTabs);
		this.addDropDownMenu(projectBar, projectTabs);
	}

	clearProjectTabs() {
		const customProjTabs = document.querySelector(".customProj");
		customProjTabs.parentNode.removeChild(customProjTabs);
	}

	addDropDownMenu(menuBar, tabs) {
		// Tabs will be elongated based on tab hovered.
		menuBar.addEventListener("mouseover", () => {
			tabs.style.display = "block";
		});
		menuBar.addEventListener("mouseout", () => {
			tabs.style.display = "none";
		});
	}

	addTab(menuTab, projectName) {
		const tab = document.createElement("li");

		tab.textContent = this.toDoList.getProject(projectName).name;
		menuTab.appendChild(tab);
	}

	addSlideInOut() {
		const sideBar = document.getElementById("sideBar");
		sideBar.addEventListener("mouseover", this.slideOut);
		sideBar.addEventListener("mouseout", this.slideIn);
	}
	removeSlideInOut() {
		const sideBar = document.getElementById("sideBar");
		sideBar.removeEventListener("mouseover", this.slideOut);
		sideBar.removeEventListener("mouseout", this.slideIn);
	}
	slideOut() {
		sideBar.style.width = "200px";
	}
	slideIn() {
		sideBar.style.width = "65px";
	}

	loadSwitchPageEvents() {
		// Add click event listener and Load the page based on the
		// current title
		const tabs = ["span#inbox", "span#important", "li"];

		tabs.forEach((tab) => this.addSwitchPageFunc(tab));
	}

	addSwitchPageFunc(tabQuery) {
		const allTabs = document.querySelectorAll(tabQuery);
		allTabs.forEach((tab) => {
			// Register click event to load page based on sideBar title text.
			tab.addEventListener("click", () => {
				this.syncStatusCheck(this.currentProjectPage);
				this.currentProjectPage = tab.innerText;
				this.loadPage(this.currentProjectPage);
			});
		});
	}

	/* Sync statusCheck functionality */
	syncStatusCheck(projectName) {
		// Checks the status of tasks in a given project
		// against the projects list and updates them accordingly.
		const taskChecked = [];
		const taskNotChecked = [];

		for (let task of this.toDoList.getProject(projectName).tasks) {
			task.status
				? taskChecked.push(task.name)
				: taskNotChecked.push(task.name);
		}

		for (let project of this.toDoList.projects) {
			for (let task of project.tasks) {
				taskChecked.includes(task.name)
					? (task.status = true)
					: taskNotChecked.includes(task.name)
					? (task.status = false)
					: "";
			}
		}
	}
}
