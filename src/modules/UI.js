import Task from "./task";
import Project from "./project";
import AllProjects from "./AllProjects";
import { TaskUI, ProjectUI } from "./UI/ProjectUI";


export default class UI {
    constructor() {
        this.toDoList = new AllProjects();
    };

    loadHomePage() {
        UI.addSideBarFunc();
        console.log(this.toDoList.getProject('Inbox'));

        // Add a task to inbox.
        this.toDoList.getProject('Inbox').addTask(new Task(
            'Walking the dog', 'He is asking for it so this task is a must', 'today',
            'medium', this.toDoList.getProject('Inbox').tasks.length
        ));
        
        // get the task from inbox
        for(let task of this.toDoList.getProject('Inbox').tasks) {
            const newTask = new TaskUI(task);
            const newTaskDisplay = newTask.draw()
        };

        const projectDisplay = new ProjectUI(this.toDoList.getProject('Inbox'));
        projectDisplay.draw();
        console.log(this.toDoList.getProject('Inbox').tasks);
        console.log(this.toDoList.getProject('Today').name)
        this.addInboxTabs();
    }

    addInboxTabs() {
        // Add today and this week's task beneath Inbox tab sidebar.
        const inboxTabs = document.createElement('ul');

        this.addTab(inboxTabs, 'Today');
        this.addTab(inboxTabs, 'This Week');

        const inboxBar = document.querySelector('.inbox-bar');
        inboxBar.appendChild(inboxTabs)
    }
    addTab(menuTab, projectName) {
        // Create li and append it to given param elem.
        const tab = document.createElement('li');
        
        tab.textContent = this.toDoList.getProject(projectName).name;
        menuTab.appendChild(tab);
    }


    static addSideBarFunc() {
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
