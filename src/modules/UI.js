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
	}

	loadHomePage() {
		// Initialise first dummy task:
		const dateToday = format(new Date(), "dd/MM/yyyy");
		const task1 = {
			title: "Walking the dog",
			details: "He is asking for it so this task is a must",
			priority: "medium",
			date: dateToday,
		};
		this.addNewTask(this.currentProjectPage, task1);

		const task2 = {
			title: "Walking the dog 2",
			details: "He is asking for it so this task is a must",
			priority: "high",
			date: "30/01/2023",
		};
		this.addNewTask(this.currentProjectPage, task2);
		// this.loadPage("Today");
		// this.loadPage("This Week");
		this.loadPage("Inbox");
		this.loadSideBar();
	}

	loadPage(projectName) {
		// We need to reset all ids on all tasks to prevent
		// deletion of two tasks with the same id at once.
		this.toDoList.getProject(projectName).reInitialiseId();

		// Update today's, this week's and important tasks.
		this.updateAllTasks();

		this.drawPage(projectName);

		this.addProjFunction();

		// Reinitialise add task function for new page's btn.
		this.addTaskFunction(projectName);

		// Apply eventlisteners for each corresponding bin icons.
		this.applyDelTaskFunction(projectName);
	}

	drawPage(projectName) {
		const projectDisplay = new ProjectUI(this.toDoList.getProject(
			projectName));
		projectDisplay.draw();

		// Update navBar text displaying project's title page
		const titleText = document.querySelector(".title-page-text");
		titleText.textContent = projectName;
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
			const appendTaskBtn = document.querySelector(
				".uniqueBtn.appendTaskBtn");
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
		// this.loadPage(projectName);
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
					this.toDoList.getProject(projectName).tasks.length
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
								.setCustomValidity(
									"Name has already been used!");
							return;
						}
					}
				}
				this.addNewTask(projectName, taskInfo);

				document.querySelector("form").style.visibility = "hidden";
				document.querySelector(".face-mask").style.visibility ="hidden";
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
				this.loadPage(newProjTitle.value);
			}
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
	applyDelTaskFunction(projectName) {
		// For all the tasks in the project, add removeTask functionality for
		// each task.
		this.toDoList.getProject(projectName).tasks.map((task) => {
			this.removeTaskFunction(projectName, task.id);
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
		for (let projectName in allSetTasks) {
			for (let task of allSetTasks[projectName]) {
				// Prevent adding duplicate tasks to project.
				if (!this.toDoList.getProject(projectName).tasks.includes(
					task)) {
					this.toDoList.getProject(projectName).addTask(task);
				}
			}
		}
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
		sideBar.addEventListener("mouseover", () => {
			sideBar.style.width = "200px";
		});
		sideBar.addEventListener("mouseout", () => {
			sideBar.style.width = "65px";
		});
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
	};

	/* Sync statusCheck functionality */
	syncStatusCheck(projectName) {
		let taskChecked = [];
		let taskNotChecked = [];

		// Check for tasked checked off.
		for(let task of this.toDoList.getProject(projectName).tasks) {
			if(task.status) {
				taskChecked.push(task.name);
			} else {
				taskNotChecked.push(task.name);
			};
		};

		// Apply tasked checked OR unchecked
		for(let project of this.toDoList.projects) {
			for(let task of project.tasks) {
				if(taskChecked.includes(task.name)) {
					task.status = true;
				} else if(taskNotChecked.includes(task.name)) {
					task.status = false;
				};
			};
		};
	};
}
