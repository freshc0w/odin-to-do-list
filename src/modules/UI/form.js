export {DrawForm}

const DrawForm = () => {
    // When user presses add task, pop up a form that asks for all req input.
    // This includes [taskName, details, priorityLevel, Date];
    const formContainer = document.querySelector('.form-container');

    const clear = () => {
        while(formContainer.firstChild) {
            formContainer.removeChild(formContainer.lastChild);
        };
    }
    
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
        // A wrapper is going to wrap the label and a container consisting of
        // the radio options. 
        const inputPrioWrapper = document.createElement('div');
        const label = document.createElement('div');
        const prioOptionsContainer = document.createElement('div');
        inputPrioWrapper.classList.add('prioWrapper')
        prioOptionsContainer.classList.add('prioOptions');

        label.classList.add('prioLabel');
        label.textContent = "How important is this task?";
        const lowPrio = createRadioInputAndLabel('lowPrio', 'Low');
        const medPrio = createRadioInputAndLabel('medPrio', 'Med');
        const highPrio = createRadioInputAndLabel('highPrio', 'High');

        for(let prioOptions of [lowPrio, medPrio, highPrio]) {
            prioOptionsContainer.appendChild(prioOptions);
        };

        inputPrioWrapper.appendChild(label);
        inputPrioWrapper.appendChild(prioOptionsContainer);
        return inputPrioWrapper;

        function createRadioInputAndLabel(id, value) {
            const radioOptionContainer = document.createElement('div');
            const input = document.createElement('input');
            const attributes = {
                "type": "radio",
                "id": id,
                "name": 'prio',
            };
            for(let attr in attributes) {
                input.setAttribute(attr, attributes[attr]);
            };

            const label = document.createElement('label');
            label.setAttribute('for', id);
            label.classList.add(id);
            label.textContent = value;
            
            radioOptionContainer.appendChild(input);
            radioOptionContainer.appendChild(label);
            return radioOptionContainer;
        };
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
    return { addTask, clear};


}