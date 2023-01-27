export default class Task {
    constructor(name, description, dueDate, priority, id) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id; // To allow deletion of task with the same name;
        
    }
    set name(value) {
        this._name = value;
    };

    get name() {
        return this._name;
    };
    
    get id() {
        return this._id;
    };
    set id(value) {
        this._id = value;
    }
    get priority() {
        return this._priority;
    }
    set priority(value) {
        this._priority = value;
    }
    
    get description() {
        return this._description;
    };
    set description(value) {
        this._description = value;
    };

    get dueDate() {
        return this._dueDate;
    };
    set dueDate(value) {
        this._dueDate = value;
    }
    get dueDateFormatted() {
        const day = this.dueDate.split('-')[0];
        const month = this.dueDate.split('-')[1];
        const year = this.dueDate.split('-')[2];

        return `${day}/${month}/${year}`;
    };
};