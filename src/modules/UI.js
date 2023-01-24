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
            'high', this.toDoList.getProject('Inbox').tasks.length
        ));
        
        // get the task from inbox
        for(let task of this.toDoList.getProject('Inbox').tasks) {
            const newTask = new TaskUI(task);
            const newTaskDisplay = newTask.draw()
        };

        const projectDisplay = new ProjectUI(this.toDoList.getProject('Inbox'));
        projectDisplay.draw();
        console.log(this.toDoList.getProject('Inbox').tasks)

    }

    static addSideBarFunc() {
        const sideBar = document.getElementById('sideBar');
        sideBar.addEventListener('mouseover', () => {
            sideBar.style.width = '200px';
        });
        sideBar.addEventListener('mouseout', () => {
            sideBar.style.width = '65px';
        });

        document.getElementsByClassName('inbox-bar');
    };
};
