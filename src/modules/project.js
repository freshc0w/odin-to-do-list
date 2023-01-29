import { toDate, isToday, isThisWeek, subDays } from 'date-fns';
export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    };
    
    get name() {
        return this._name;
    };
    set name(value) {
        this._name = value;
    };
    get tasks() {
        return this._tasks;
    };
    set tasks(value) {
        this._tasks = value;
    }
    addTask(task) {
        this._tasks.push(task);        
    };
    deleteTask(taskId) {
        this._tasks = this._tasks.filter(task => task.id !== taskId);
    };
    reInitialiseId() {
        for(let newId = 0; newId < this.tasks.length; newId++) {
            this.tasks[newId].id = newId; 
        }
    }

    // To be added: Get today's, this week's and important tasks. 
    getTasksToday() {
        return this.tasks.filter(task => {
            const taskDate = new Date(task.dueDateFormatted);
            return isToday(toDate(taskDate));
        })
    };
    getTasksThisWeek() {
        return this.tasks.filter(task => {
            const taskDate = new Date(task.dueDateFormatted);
            return isThisWeek(toDate(taskDate), 1)
        })
    };
    getImportantTasks() {
        return this.tasks.filter(task => {
            return task.priority === "high";
        });
    };

};