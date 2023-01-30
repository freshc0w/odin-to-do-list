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
    for(let proj of ["Odin Grind", "Novels", "Netflix"]) {
        userInterface.toDoList.addProject(proj)
    }
    

	// Initialise tasks
	const task1 = {
		title: "Learn React in 20 days",
		details: "He is asking for it so this task is a must",
		priority: "medium",
		date: dateToday,
	};
	const task2 = {
		title: "Revise Intermediate Git Control",
		details: "He is asking for it so this task is a must",
		priority: "high",
		date: dateInTwoDays,
	};
	const task3 = {
		title: "Finish off 'Ways of Kings' by Brandon Sanderson",
		details: "He is asking for it so this task is a must",
		priority: "low",
		date: dateInThreeDays,
	};
	const task4 = {
		title: "Get badminton racquets",
		details: "He is asking for it so this task is a must",
		priority: "high",
		date: dateInFourDays,
	};
	const task5 = {
		title: "Watch Suits",
		details: "He is asking for it so this task is a must",
		priority: "low",
		date: dateInEightDays,
	};
	const task6 = {
		title: "Start learning node.js",
		details: "He is asking for it so this task is a must",
		priority: "high",
		date: dateInTenDays,
	};
	const task7 = {
		title: "Prepare dinner for family",
		details: "He is asking for it so this task is a must",
		priority: "medium",
		date: dateToday,
	};

    userInterface.addNewTask("Odin Grind", task1)
    userInterface.addNewTask("Odin Grind", task6);
    userInterface.addNewTask("Odin Grind", task2);
    userInterface.addNewTask("Novels", task3);
    userInterface.addNewTask("Netflix", task5);
    
	const allTasks = [task4, task7];
    
	for (let task of allTasks) {
        userInterface.addNewTask(userInterface.currentProjectPage, task);
	};
    
    userInterface.loadPage(userInterface.currentProjectPage);
	userInterface.loadSideBar();
	userInterface.deleteProjFunction();
}
