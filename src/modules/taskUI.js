import Task from "./task";
// left to right -> checkbox, task name, details btn, priority, Date, edit, bin.
// After user edits the form, clear all info and draw them again.

export default function loadTaskUI(task) {

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('taskContainer');

    // Might need to add conditionals so that the checkBox doesn't reset after form.
    // Add a status boolean conditional for Task Class maybe?
    const checkBox = document.createElement('input');
    checkBox.classList.add('taskCheckBox');
    checkBox.setAttribute('input', 'checkbox');

    const nameDisplay = document.createElement('div');
    nameDisplay.classList.add('taskNameDisplay');
    nameDisplay.textContent = task.name;

    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('detailsBtn');
    detailsBtn.textContent = "Details";

    const priorityDisplay = document.createElement('div');
    priorityDisplay.classList.add('priorityDisplay');
    // Add low - high class based on prio and change bg-color.
    priorityDisplay.textContent = '!'; 
    
    const dateDisplay = document.createElement('div');
    dateDisplay.classList.add("dateDisply")
    dateDisplay.textContent = task.dueDate;

    const editOption = document.createElement('div'); // Subject to change to img 
    editOption.classList.add('iconOption');
    editOption.textContent = 'EDIT';

    const deleteOption = document.createElement('div'); // Subject to change to img 
    deleteOption.classList.add('iconOption');
    deleteOption.textContent = 'DELETE';

    const infos= [taskContainer, checkBox, nameDisplay,
                    detailsBtn, priorityDisplay, dateDisplay,
                    editOption, deleteOption]
    
    for(let info of infos) {
        taskContainer.appendChild(info);
    };
    
    return taskContainer;

}