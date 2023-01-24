export default class Task {
    constructor(name, description, dueDate, priority, id) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id; // To allow deletion of task with the same name;
    }
    get name() {
        return this.name;
    };
    
    set name(value) {
        this.name = value;
    };

    get id() {
        return this.id;
    };
    set id(value) {
        this.id = id;
    }
    get priority() {
        return this.priority;
    }
    set priority(value) {
        this.priority = value;
    }
    
    get description() {
        return this.description;
    };
    set description(value) {
        this.description = value;
    };

    get dueDate() {
        return this.dueDate;
    };
    get dueDateFormatted() {
        const day = this.dueDate.split('/')[0];
        const month = this.dueDate.split('/')[1];
        const year = this.dueDate.split('/')[2];

        return `${day}/${month}/${year}`;
    };
};