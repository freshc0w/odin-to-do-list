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
		const dateToday = format(new Date(), 'dd/MM/yyyy')
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
			priority: "medium",
			date: '30/01/2023',
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

		this.drawPage(projectName);

		// Reinitialise add task function for new page's btn.
		this.addTaskFunction(projectName);
		// Apply eventlisteners for each corresponding bin icons.
		this.applyDelTaskFunction(projectName);

		this.updateTasksToday();
		this.updateTasksThisWeek();
	}

	drawPage(projectName) {
		const projectDisplay = new ProjectUI(this.toDoList.getProject(projectName));
		projectDisplay.draw();
	}

	/* Button functionalities */
	addTaskFunction(projectName) {
		const addTaskBtn = document.querySelector(".uniqueBtn.add");
		addTaskBtn.addEventListener("click", () => {

			// Clear any current form and draw the add task form.
			this.currentForm.clear();
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
		// this.loadPage(projectName);
	}

	submitTaskFunction(btn, projectName) {
		btn.addEventListener("click", (event) => {
			if(document.querySelector('form').checkValidity()){
				const taskInfo = this.currentForm.collectTaskInfo();
				this.addNewTask(projectName, taskInfo);
	
				document.querySelector("form").style.visibility = "hidden";
				document.querySelector(".face-mask").style.visibility = "hidden";		
				this.loadPage(projectName);
				event.preventDefault();
			}
		});
	}

	removeTaskFunction(projectName, taskId) {
		// Add delete task functions for each existing taskUI.
		const delImg = document.getElementById(`delTask-${taskId}`);
		delImg.addEventListener("click", () => {
			this.toDoList.getProject(projectName).deleteTask(taskId);
			this.loadPage(projectName);
		});
	}
	applyDelTaskFunction(projectName) {
		// For all the tasks in the project, add removeTask functionality for
		// each task.
		this.toDoList.getProject(projectName).tasks.map((task) => {
			this.removeTaskFunction(projectName, task.id);
		});
	};

	
	updateTasksToday() {
		const allTasksToday = this.toDoList.getAllTasksToday();

		// Prevent duplicate tasks from getting added.
		for(let taskToday of allTasksToday) {
			if(!this.toDoList.getProject('Today').tasks.includes(taskToday)) {
				this.toDoList.getProject('Today').addTask(taskToday);
			}
		};
	};

	updateTasksThisWeek() {
		const allTasksThisWeek = this.toDoList.getAllTasksThisWeek();

		// Prevent adding dups
		for(let taskThisWeek of allTasksThisWeek) {
			if(!this.toDoList.getProject('This Week').tasks.includes(taskThisWeek)) {
				this.toDoList.getProject('This Week').addTask(taskThisWeek);
			};
		};
	};




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
		const inboxProjects = ["Inbox", "Today", "This Week"];
		const customProjects = this.toDoList.projects.filter(
			(project) => !inboxProjects.includes(project.name)
		);

		const projectTabs = document.createElement("ul");
		for (let project of customProjects) {
			this.addTab(projectTabs, project.name);
		}

		const projectBar = document.querySelector(".project-bar");
		projectBar.appendChild(projectTabs);
		this.addDropDownMenu(projectBar, projectTabs);
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
	};

	loadSwitchPageEvents() {
		const inboxIcons = document.querySelectorAll("#inbox");
		inboxIcons.forEach(icon => {
			icon.addEventListener("click", () => {
				this.currentProjectPage = "Inbox";
				this.loadPage(this.currentProjectPage);
			});
		});
		const allTabs = document.querySelectorAll("li");
		allTabs.forEach(tab => {
			tab.addEventListener("click", () => {
				this.currentProjectPage = tab.innerText;
				this.loadPage(this.currentProjectPage);
			});
		});
	}
}
