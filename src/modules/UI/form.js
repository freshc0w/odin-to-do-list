export {DrawForm}

const DrawForm = () => {
    // When user presses add task, pop up a form that asks for all req input.
    // This includes [taskName, details, priorityLevel, Date];
    const formContainer = document.querySelector('.form-container');

    const addTask = () => {
        const taskTitle = addInputText('Task Title: ', 'e.g. Learn React in ' +
        '20 days..', 'inputTaskTitle');
        taskTitle.classList.add('inputTaskTitle');

        const taskDetails = addTextArea('Task Details: ', 'e.g. Not an ' +
        'task. Remember to take breaks and walk outside.',
         'inputTaskDetails');
        taskDetails.classList.add('inputTaskDetails'); 
        
        const prioOptions = addPriorityOptions();
        const dueDate = addInputDueDate();
        const closeFormOption = addCloseFormFunction();

        const tasksInfo = [taskTitle, taskDetails, prioOptions, dueDate,
                            closeFormOption];

        for(let info of tasksInfo) {
            formContainer.appendChild(info);
        };
    };

    const addCloseFormFunction = () => {
        const closeForm = document.createElement('img');
        closeForm.classList.add('closeFormBtn');
        closeForm.src = '../../../imgs/mac-close-btn.png';
        closeForm.alt = 'A button that closes the form.';

        closeForm.addEventListener('click', () => {
            const form = document.querySelector('form');
            const overlay = document.querySelector('.face-mask');
            form.style.visibility = 'hidden';
            overlay.style.visibility = 'hidden';
        });

        return closeForm;
    };

    const addInputDueDate = () => {
        const dueDate = document.createElement('div');

        const dateLabel = document.createElement('label');
        dateLabel.classList.add('dateLabel');
        dateLabel.setAttribute('for', 'inputDueDate');
        dateLabel.textContent = 'Due Date:';

        const inputDueDate = document.createElement('input');
        inputDueDate.setAttribute('type', "date");
        inputDueDate.setAttribute('id', 'inputDueDate');
        inputDueDate.setAttribute('name', 'trip-start');

        // Set default value to today's date.
        window.addEventListener('DOMContentLoaded', event => {
            inputDueDate.valueAsDate = new Date();
        });

        dueDate.appendChild(dateLabel);
        dueDate.appendChild(inputDueDate);
        return dueDate;

    }

    const addPriorityOptions = () => {
        const inputPriority = document.createElement('div');

        const prioLabel = document.createElement('div');
        prioLabel.classList.add('prioLabel');
        prioLabel.textContent = "Level of Importance:"

        const lowBtn = document.createElement('button');
        const medBtn = document.createElement('button');
        const highBtn = document.createElement('button');
        
        lowBtn.classList.add('lowBtn');
        medBtn.classList.add('medBtn');
        highBtn.classList.add('highBtn');
        
        lowBtn.textContent = 'Low';
        medBtn.textContent = 'Med';
        highBtn.textContent = 'High';

        inputPriority.appendChild(prioLabel);
        for(let btn of [lowBtn, medBtn, highBtn]) {
            btn.addEventListener("click", (event) => {
                event.preventDefault();
            })
            inputPriority.appendChild(btn);
        };

        return inputPriority;

    }

    const addTextArea = (labelName, placeholder, id, required=true) => {
        const input = document.createElement('div');

        const inputLabel = document.createElement('label');
        inputLabel.setAttribute('for', id);
        inputLabel.textContent = labelName;

        const inputTextArea = document.createElement('textarea');
        const attributes = {
            'id': id,
            'name': id,
            'placeholder': placeholder,
            'rows': 6,
            'cols': 50,
        };

        for(let attrIdx in attributes) {
            inputTextArea.setAttribute(attrIdx, attributes[attrIdx])
        }
        inputTextArea.required = required; // Default True

        input.appendChild(inputLabel);
        input.appendChild(inputTextArea);
        return input
    }

    const addInputText = (labelName, placeholder, id, required=true) => {
        const input = document.createElement('div');

        const inputLabel = document.createElement('label');
        inputLabel.setAttribute('for', id);
        inputLabel.textContent = labelName;

        const inputText = document.createElement('input');
        const attributes = {
            'type': 'text',
            'id': id,
            'name': id,
            'placeholder': placeholder
        };
        for(let attrIdx in attributes) {
            inputText.setAttribute(attrIdx, attributes[attrIdx])
        }

        inputText.required = required; 

        input.appendChild(inputLabel);
        input.appendChild(inputText);
        return input;
    }
    return { addTask };


}