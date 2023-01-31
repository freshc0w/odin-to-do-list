import UI from "./modules/UI";
import format from "date-fns/format";

loadHomePage();
function loadHomePage() {
	const userInterface = new UI();

	// Initialise set dates
	Date.prototype.addDays = function (days) {
		let date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	};
	const date = new Date();
	const dateToday = format(date, "dd/MM/yyyy");
	const dateInTwoDays = format(date.addDays(2), "dd/MM/yyy");
	const dateInThreeDays = format(date.addDays(3), "dd/MM/yyy");
	const dateInFourDays = format(date.addDays(4), "dd/MM/yyy");
	const dateInEightDays = format(date.addDays(8), "dd/MM/yyy");
	const dateInTenDays = format(date.addDays(10), "dd/MM/yyy");

	// Initialise projects
	for (let proj of ["Odin Grind", "Novels", "Netflix"]) {
		userInterface.toDoList.addProject(proj);
	}

	// Initialise tasks
	const task1 = {
		title: "Learn React in 20 days",
		details:
			"Create an app to track progress, use React components, set a timeline of 20 days, break down daily tasks into smaller tasks, set achievable deadlines, track small wins, and ask for help if stuck.",
		priority: "medium",
		date: dateToday,
	};
	const task2 = {
		title: "Revise Intermediate Git Control",
		details:
			"Create sub-branches. Merge with main branch. Execute commands: add, commit, push. Review conflicts & solutions. Unlock advanced features",
		priority: "high",
		date: dateInTwoDays,
	};
	const task3 = {
		title: "Finish off 'Ways of Kings' by Brandon Sanderson",
		details: "Finish fantasy epic 'Ways of Kings' in 10 days",
		priority: "low",
		date: dateInThreeDays,
	};
	const task4 = {
		title: "Learn about MongoDB and revise SQL",
		details:
			"Explain MongoDB Basics, explore SQL fundamentals, revise and improve knowledge.",
		priority: "high",
		date: dateInFourDays,
	};
	const task5 = {
		title: "Watch Suits",
		details: "Watch Suits: Netflix marathon - catch up on current season!",
		priority: "low",
		date: dateInEightDays,
	};
	const task6 = {
		title: "Start learning node.js",
		details:
			"Decide language. Install platform. Choose tutorial. Read docs and guides. Code & practice. Troubleshoot & debug. Expand knowledge",
		priority: "high",
		date: dateInTenDays,
	};
	const task7 = {
		title: "Prepare dinner for family",
		details:
			"Slice vegetables, Sauté chicken, simmer sauce, grill corn and serve dinner by 7pm.",
		priority: "medium",
		date: dateToday,
	};

	userInterface.addNewTask("Odin Grind", task1);
	userInterface.addNewTask("Odin Grind", task6);
	userInterface.addNewTask("Odin Grind", task2);
	userInterface.addNewTask("Novels", task3);
	userInterface.addNewTask("Netflix", task5);

	const allTasks = [task4, task7];

	for (let task of allTasks) {
		userInterface.addNewTask(userInterface.currentProjectPage, task);
	}

	userInterface.loadPage(userInterface.currentProjectPage);
	userInterface.loadSideBar();
	userInterface.deleteProjFunction();

	addEnlargeMaximise();

	function addEnlargeMaximise() {
		document.getElementById("maxMinScreen").addEventListener("click", () => {
			userInterface.toggleScreen();
		});
	}
}
