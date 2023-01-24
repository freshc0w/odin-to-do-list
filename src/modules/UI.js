import Task from "./task";
import Project from "./project";
import AllProjects from "./AllProjects";

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

class TaskUI {

    // Purpose of this class it to take in a task obj, and turn it into
    // a div with all relevant information regarding the task.
    // From left-to-right: [checkBox, name, details, priority, date, editIcon, binIcon]
    constructor(taskObj) {
        this.task = taskObj;
    };
    renderInfo(elem, addedClass, text='') {
        const name = document.createElement(elem);
        name.classList.add(addedClass);
        name.textContent = text; // default empty str
        
        return name
    };
    createElements() {
        const statusCheck = this.renderInfo('input', 'statusCheck');
        statusCheck.setAttribute('type', 'checkbox');
        const name = this.renderInfo('div', 'taskName', this.task.name);
        const details = this.renderInfo('div', 'taskDetails', this.task.description);
        const priority = this.renderInfo('div', 'statusPrio', '!');
        const date = this.renderInfo('div', 'taskDate', 'This is the  dueDate.');

        // icons
        const edit = this.renderInfo('div', 'taskEdit', 'This is a editIcon.')
        const taskDel = this.renderInfo('div', 'taskDel', 'This is a binIcon.');

        return [statusCheck, name, details, priority, date, edit, taskDel]
    };
    draw() {
        const taskContainer = this.renderInfo('div', 'taskContainer');
        const elems = this.createElements();
        for (let elem of elems) {
            taskContainer.appendChild(elem);
        };
        return taskContainer;
    };
};

class ProjectUI {
    constructor(projectObj) {
        this.project = projectObj;
    };
    draw() {
        const mainContent = document.querySelector('#main-content');
        this.clear(mainContent);

        // Loop through all the tasks and give it a TaskUI class.
        // Use the draw method to get the div container and append it to mainContent.

        this.drawTasks(mainContent, this.project.tasks);
    }
    drawTasks(container, tasks) {
        for(let task of tasks) {
            const taskDisplay = new TaskUI(task);
            container.appendChild(taskDisplay.draw());
        };
    };

    clear(content) {
        content.innerHTML = '';
    }


}


