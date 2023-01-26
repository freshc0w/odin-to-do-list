import Task from "./task";
import Project from "./project";
import AllProjects from "./AllProjects";
import { TaskUI, ProjectUI } from "./UI/ProjectUI";
import { DrawForm } from "./UI/form";


export default class UI {
    constructor() {
        this.toDoList = new AllProjects();
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

    /* Draw Forms */
    drawForm = (() => {
        const form = DrawForm();
        const clear = form.clear;
        const addTask = form.addTask;
        const collectTaskInfo = form.collectTaskInfo;
        return {
            clear,
            addTask,
            collectTaskInfo,
        };
    })();


    /* Button functionalities */
    addTaskFunction() {
        const addTaskBtn = document.querySelector('.uniqueBtn.add');
        addTaskBtn.addEventListener("click", () => {
            this.drawForm.clear();
            this.drawForm.addTask();
            document.querySelector('form').style.visibility = "visible";
            document.querySelector('.face-mask').style.visibility = "visible";

            // Set default date input to current day.
            inputDueDate.valueAsDate = new Date();

            // Add functionality to appendTaskBtn
            const appendTaskBtn = document.querySelector(
                            '.uniqueBtn.appendTaskBtn')
            appendTaskBtn.addEventListener("click", (event) => {
                
                // Collect all information based on user inputs.
                const info = this.drawForm.collectTaskInfo();
                console.log(info);
                
                // Add a new task to the specific project based on user inputs.
                this.toDoList.getProject('Inbox').addTask(
                    new Task(
                    info['title'],
                    info['details'],
                    info['date'],
                    info['priority'],
                    this.toDoList.getProject('Inbox').length 
                ));
                
                // Use projectUI class to draw the whole project again on 
                // the display.
                const projectDisplay = new ProjectUI(this.toDoList.getProject(
                    'Inbox'));
                projectDisplay.draw();

                this.addTaskFunction();
                event.preventDefault();
            })
        });
    };


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
