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

    // To be added: Get today's and this week's tasks. 
};