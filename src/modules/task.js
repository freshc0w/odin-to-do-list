export default class Task {
    constructor(name, description, dueDate, priority) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    get name() {
        return this.name;
    }
    
    set name(value) {
        this.name = value;
    }
    
    get description() {
        return this.description;
    }
    set description(value) {
        this.description = value;
    };

    get dueDate() {
        return this.dueDate;
    }
    get dueDateFormatted() {
        const day = this.dueDate.split('/')[0];
        const month = this.dueDate.split('/')[1];
        const year = this.dueDate.split('/')[2];

        return `${day}/${month}/${year}`;
    }
};