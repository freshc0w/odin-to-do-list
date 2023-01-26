import Task from "./task";
import Project from "./project";
import AllProjects from "./AllProjects";
import { TaskUI, ProjectUI } from "./UI/ProjectUI";
import { DrawForm } from "./UI/form";


export default class UI {
    constructor() {
        this.toDoList = new AllProjects();
        
        // Initialise first homePage to be on the "Inbox" page.
        this.currentProjectPage = 'Inbox';
        this.currentForm = DrawForm();
    };

    loadHomePage() {
        console.log(this.toDoList.getProject('Inbox'));

        // Add a task to inbox.
        this.toDoList.getProject('Inbox').addTask(new Task(
            'Walking the dog', 'He is asking for it so this task is a must', 'today',
            'medium', this.toDoList.getProject('Inbox').tasks.length
        ));
        
        // get the task from inbox
    

        const projectDisplay = new ProjectUI(this.toDoList.getProject('Inbox'));
        projectDisplay.draw();


        this.loadSideBar();
        this.addTaskFunction();
    }

    /* Button functionalities */
    addTaskFunction() {
        const addTaskBtn = document.querySelector('.uniqueBtn.add');
        addTaskBtn.addEventListener("click", () => {
            this.currentForm.clear();
            this.currentForm.addTask();

            document.querySelector('form').style.visibility = "visible";
            document.querySelector('.face-mask').style.visibility = "visible";

            // Set default date input to current day.
            inputDueDate.valueAsDate = new Date();

            // Add draw new task functionality to appendTaskBtn on the form. 
            const appendTaskBtn = document.querySelector(
                            '.uniqueBtn.appendTaskBtn');
            this.drawNewTask(appendTaskBtn, "Inbox");
            });
        };

    drawNewTask(btn, projectName) {
        btn.addEventListener("click", (event) => {
            const info = this.currentForm.collectTaskInfo();

            this.toDoList.getProject(projectName).addTask(
                new Task(
                info['title'],
                info['details'],
                info['date'],
                info['priority'],
                this.toDoList.getProject(projectName).length 
            ));
            this.drawPage(projectName);
            event.preventDefault();
        })
    };

    drawPage(projectName) {
        const projectDisplay = new ProjectUI(this.toDoList.getProject(projectName));
        projectDisplay.draw();
        this.addTaskFunction(); // Reinitialise add task function for new page's btn.
        
    }

    /* SideBar functionalities */
    loadSideBar() {
        this.addSlideInOut();
        this.drawInboxTabs();
        this.drawProjectTabs();
    }

    drawInboxTabs() {
        // Add today and this week's task beneath Inbox tab sidebar.
        const inboxTabs = document.createElement('ul');

        this.addTab(inboxTabs, 'Today');
        this.addTab(inboxTabs, 'This Week');

        const inboxBar = document.querySelector('.inbox-bar');
        inboxBar.appendChild(inboxTabs);
        this.addDropDownMenu(inboxBar, inboxTabs)
    };

    drawProjectTabs() {
        // Find all other projects.
        const inboxProjects = ['Inbox', 'Today', 'This Week']
        const customProjects = this.toDoList.projects.filter(
            project => !inboxProjects.includes(project.name)
            );

        const projectTabs = document.createElement('ul');
        for(let project of customProjects) {
            this.addTab(projectTabs, project.name)
        };

        const projectBar = document.querySelector('.project-bar');
        projectBar.appendChild(projectTabs);
        this.addDropDownMenu(projectBar, projectTabs);
    }


    addDropDownMenu(menuBar, tabs) {
        // Tabs will be elongated based on tab hovered.
        menuBar.addEventListener('mouseover', () => {
            tabs.style.display = "block";
        });
        menuBar.addEventListener('mouseout', () => {
            tabs.style.display = "none";
        })
    }
    addTab(menuTab, projectName) {
        // Create li and append it to given param elem.
        const tab = document.createElement('li');
        
        tab.textContent = this.toDoList.getProject(projectName).name;
        menuTab.appendChild(tab);
    }

    addSlideInOut() {
        const sideBar = document.getElementById('sideBar');
        const materialIcons = document.querySelectorAll('.material-icons');
        const iconText = document.querySelectorAll('.icon-text');
        sideBar.addEventListener('mouseover', () => {
            sideBar.style.width = '200px';
        });
        sideBar.addEventListener('mouseout', () => {
            sideBar.style.width = '65px';
        });

    };
};
