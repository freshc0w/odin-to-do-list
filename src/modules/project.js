export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    };
    
    get name() {
        return this.name;
    };
    set name(value) {
        this.name = value;
    };
    get tasks() {
        return this.tasks;
    };
    addTask(task) {
        this.tasks.push(task);        
    };
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.getId() !== taskId);
    };

    // To be added: Get today's and this week's tasks. 
};