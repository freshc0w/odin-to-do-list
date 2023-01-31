import format from "date-fns/format";
import Task from "./task";
import Project from "./project";
import AllProjects from "./AllProjects";
import { TaskUI, ProjectUI } from "./UI/ProjectUI";
import { DrawForm } from "./UI/form";

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
		const main = document.querySelector('.main-container');
		const sideBar = document.getElementById('sideBar');
		const titleText = document.querySelector('.title-page-text')
		if(!this.screen) {
			mainLarge();
			this.removeSlideInOut();
			titleText.style.marginRight = "calc(-10rem - 150px)";
			sideBarLarge();
			this.screen = true;
		} else {
			mainSmall();
			this.addSlideInOut();
			titleText.style.marginRight = "calc(-10rem - 32.5px)";
			sideBarSmall();
			this.screen = false;
		};
		function mainLarge() {
			main.style.height = "100vh";
			main.style.width = "100vw";
			main.style.transform = "translateX(20.5%)";
			main.style.backgroundColor = "rgba(25, 25, 25, 0.95)";
			main.style.backdropFilter = "blur(3px)";
		}
		function mainSmall() {
			main.style.height = "max(35rem, 82.5%)";
			main.style.width = "max(700px, 90%)";
			main.style.transform = "none";
			main.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
		}
		function sideBarLarge() {
			sideBar.style.width = "300px";
			sideBar.style.paddingLeft = "3rem";
			sideBar.style.boxShadow = "0 12px 8px rgba(255, 255, 255, 0.7)";
			document.querySelectorAll('a').forEach(link => {
				link.style.transform = "scale(1.2)";
			})
		}
		function sideBarSmall() {
			sideBar.style.width = "65px";
			sideBar.style.paddingLeft = "0";
			sideBar.style.boxShadow = "none";
			document.querySelectorAll('a').forEach(link => {
				link.style.transform = "none";
			})
		}
	}

	loadPage(projectName) {
		// We need to reset all ids on all tasks to prevent
		// deletion of two tasks with the same id at once.
		this.toDoList.getProject(projectName).reInitialiseId();

		// Update today's, this week's and important tasks.
		this.updateAllTasks();

		this.drawPage(projectName);

		this.addProjFunction();
		this.addClearAllTasksFunction();

		// Reinitialise add task function for new page's btn.
		this.addTaskFunction(projectName);

		// Apply eventlisteners for each corresponding bin icons.
		this.applyDelAndEditFunc(projectName);
	}

	drawPage(projectName) {
		const projectDisplay = new ProjectUI(this.toDoList.getProject(projectName));
		projectDisplay.draw();

		// Update navBar text displaying project's title page
		const titleText = document.querySelector(".title-page-text");
		titleText.textContent = projectName;

		// Because of date formatting, taskDate style needs to be reInitialised.
		const allDates = document.querySelectorAll('.taskDate');
		allDates.forEach(date => date.style.fontSize = '1.3rem');
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
				const taskInfo = this.currentForm.collectTaskInfo();
				// If task name has already been used, send custom msg error.
				for (let project of this.toDoList.projects) {
					for (let task of project.tasks) {
						if (task.name === taskInfo["title"]) {
							document
								.getElementById("inputTaskTitle")
								.setCustomValidity("Name has already been used!");
							return;
						}
					}
				}

				this.addNewTask(projectName, taskInfo);

				document.querySelector("form").style.visibility = "hidden";
				document.querySelector(".face-mask").style.visibility = "hidden";
				this.loadPage(projectName);
				event.preventDefault();
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
		// Add delete task functions for each existing taskUI.
		const delImg = document.getElementById(`delTask-${taskId}`);
		let taskName = this.toDoList
			.getProject(projectName)
			.getTaskNameById(taskId);
		delImg.addEventListener("click", () => {
			// Check all projects for the specified task and delete them when
			// event is executed.
			for (let project of this.toDoList.projects) {
				for (let task of project.tasks) {
					if (task.name === taskName) {
						project.deleteTask(task.id);
					}
				}
			}
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
			document.querySelector(".face-mask").style.visibility = "hidden";

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
			addEditDetailsBtn(selectedTask);
		});

		const collectEditDetails = (task) => {
			document.getElementById("inputTaskTitle").defaultValue = task.name;
			document.getElementById("inputTaskDetails").defaultValue =
				task.description;

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
		const addEditDetailsBtn = (task) => {
			// Change appendTask btn to edit task btn
			const editDetails = document.querySelector(".appendTaskBtn");
			editDetails.textContent = "Edit Task";

			// Change current task's details to input's new values
			// when click event executes
			editDetails.addEventListener("click", (event) => {
				changeDetailsToAll(task);
				this.loadPage(this.currentProjectPage);
				document.querySelector("form").style.visibility = "hidden";
				document.querySelector(".face-mask").style.visibility = "hidden";
				this.loadPage(this.currentProjectPage)
				event.preventDefault();
			});
		};
		const changeDetails = (task) => {
			task.name = document.getElementById("inputTaskTitle").value;
			task.description = document.getElementById("inputTaskDetails").value;
			const prioChosen = document.querySelector('input[name="prio"]:checked');
			task.priority = prioChosen.value;
			const dueDate = document.querySelector("#inputDueDate");
			const dateFormat = format(new Date(dueDate.value), "dd/MM/yyyy");
			task.dueDate = dateFormat;
		};
		const changeDetailsToAll = (specifiedTask) => {
			// Find the specified task in all projects.
			for (let proj of currentToDoList.projects) {
				for (let task of proj.tasks) {
					if (task.name === taskName) {
						console.log(task.name);
						changeDetails(task);
					}
				}
			}
		};
	}

	/* Switch Delete Project or Clear Tasks functionality depending on 
	 	current project page.*/
	addClearAllTasksFunction() {
		const clearAllTaskBtn = document.querySelector(".uniqueBtn.clear");
		clearAllTaskBtn.addEventListener("click", () => {
			const currentProject = this.toDoList.getProject(this.currentProjectPage);
			let deletedTasks = [];

			// Remove all tasks from current project.
			for (let task of currentProject.tasks) {
				currentProject.deleteTask(task.id);
				deletedTasks.push(task.name);
			}

			// Sync tasks deleted to other projects.
			for (let project of this.toDoList.projects) {
				for (let task of project.tasks) {
					if (deletedTasks.includes(task.name)) {
						project.deleteTask(task.id);
					}
				}
			}
			this.loadPage(this.currentProjectPage);
		});
	}

	/* Update Today's, This Week's and important tasks */
	updateAllTasks() {
		const allTasksToday = this.toDoList.getAllTasksToday();
		const allTasksThisWeek = this.toDoList.getAllTasksThisWeek();
		const allImportantTasks = this.toDoList.getAllImportantTasks();

		const allSetTasks = {
			Today: allTasksToday,
			"This Week": allTasksThisWeek,
			Important: allImportantTasks,
		};

		this.clearTaskForSetProj();
		for (let projectName in allSetTasks) {
			for (let task of allSetTasks[projectName]) {
				// Prevent adding duplicate tasks to project.
				if (!this.toDoList.getProject(projectName).tasks.includes(task)) {
					this.toDoList.getProject(projectName).addTask(task);
				}
			}
		}
	}
	clearTaskForSetProj() {
		// Method clears all tasks for today's, this week's and important projects.
		const setProj = ["Today", "This Week", "Important"];
		this.toDoList.projects
		.filter((project) => setProj.includes(project.name))
		.map((proj) => (proj.tasks = []));
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

		this.addTab(inboxTabs, "Today");
		this.addTab(inboxTabs, "This Week");

		const inboxBar = document.querySelector(".inbox-bar");
		inboxBar.appendChild(inboxTabs);
		this.addDropDownMenu(inboxBar, inboxTabs);
	}

	drawProjectTabs() {
		// Find all other projects.
		const inboxProjects = ["Inbox", "Today", "This Week", "Important"];
		const customProjects = this.toDoList.projects.filter(
			(project) => !inboxProjects.includes(project.name)
		);

		const projectTabs = document.createElement("ul");
		projectTabs.classList.add("customProj");
		for (let project of customProjects) {
			this.addTab(projectTabs, project.name);
		}

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
		// Create li and append it to given param elem.
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
	};
	slideIn() {
		sideBar.style.width = "65px";
	}

	loadSwitchPageEvents() {
		this.addSwitchPageFunc("span#inbox");
		this.addSwitchPageFunc("span#important");
		this.addSwitchPageFunc("li");
	}
	addSwitchPageFunc(tabQuery) {
		const allTabs = document.querySelectorAll(tabQuery);
		allTabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				this.syncStatusCheck(this.currentProjectPage);
				this.currentProjectPage = tab.innerText;
				this.loadPage(this.currentProjectPage);
			});
		});
	}

	/* Sync statusCheck functionality */
	syncStatusCheck(projectName) {
		let taskChecked = [];
		let taskNotChecked = [];

		// Check for tasked checked off.
		for (let task of this.toDoList.getProject(projectName).tasks) {
			if (task.status) {
				taskChecked.push(task.name);
			} else {
				taskNotChecked.push(task.name);
			}
		}

		// Apply tasked checked OR unchecked
		for (let project of this.toDoList.projects) {
			for (let task of project.tasks) {
				if (taskChecked.includes(task.name)) {
					task.status = true;
				} else if (taskNotChecked.includes(task.name)) {
					task.status = false;
				}
			}
		}
	}
}
