export { DrawForm }
import format from "date-fns/format";

const DrawForm = () => {
    // When user presses add task, pop up a form that asks for all req input.
    // This includes [taskName, details, priorityLevel, Date];
    const formContainer = document.querySelector('.form-container');

    const clear = () => {
        while(formContainer.firstChild) {
            formContainer.removeChild(formContainer.lastChild);
        };
    }

    const addProj = () => {
        const promptProjTitle = document.createElement('label');
        promptProjTitle.setAttribute("for", "inputProjTitle")
        promptProjTitle.classList.add("promptProjTitle");
        promptProjTitle.textContent = "Project Title:";

        const inputProjTitle = document.createElement("input");
        const inputAttributes = {
            "id": "inputProjTitle",
            "type": "text",
            "name": "inputProjTitle",
            "placeholder": "The Odin Knowin' Codin' ",
        }
        for(let attr in inputAttributes) {
            inputProjTitle.setAttribute(attr, inputAttributes[attr])
        }
        inputProjTitle.classList.add("inputProjTitle"); 
        inputProjTitle.required = true;

        const closeFormBtn = document.createElement('img');
        closeFormBtn.classList.add("closeFormBtn");
        closeFormBtn.src = '../../../imgs/mac-close-btn.png';
        closeFormBtn.alt = 'A button that closes the form.';
        closeFormBtn.addEventListener("click", () => {
            document.querySelector('form').style.visibility = "hidden";
            document.querySelector('.face-mask').style.visibility = "hidden";
        })

        formContainer.appendChild(promptProjTitle);
        formContainer.appendChild(inputProjTitle);
        formContainer.appendChild(addAppendProjBtn());
        formContainer.appendChild(closeFormBtn)
    };

    const addAppendProjBtn = () => {
        const appendProjBtn = document.createElement('button');
        appendProjBtn.classList.add('uniqueBtn');
        appendProjBtn.classList.add('appendProjBtn');
        appendProjBtn.textContent = 'Add Project';
        appendProjBtn.setAttribute("type", "submit");

        return appendProjBtn;
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

        // Add submit btn.
        const appendTaskBtn = addAppendTaskBtn();
        
        formContainer.appendChild(appendTaskBtn);
        document.getElementById("medPrio").checked = true;
    };
    
    const addAppendTaskBtn = () => {
        const appendTaskBtn = document.createElement('button');
        appendTaskBtn.classList.add('uniqueBtn');
        appendTaskBtn.classList.add('appendTaskBtn');
        appendTaskBtn.textContent = 'Add Task';
        appendTaskBtn.setAttribute("type", "submit");

        return appendTaskBtn;
    }

    const collectTaskInfo = () => {
        // Collect all relevant information based on user input and return
        // it in an obj.
        const taskTitle = document.getElementById('inputTaskTitle');
        const taskDetails = document.getElementById('inputTaskDetails');
        const prioChosen = document.querySelector(
            'input[name="prio"]:checked');
        const date = document.querySelector('#inputDueDate');
        const dateFormat = format(new Date(date.value), 'dd/MM/yyyy');

        const taskInfo = {
            'title': taskTitle.value,
            'details': taskDetails.value,
            'priority': prioChosen.value,
            'date': dateFormat,
        };
        return taskInfo; 
    }


    const addInputDueDate = () => {
        const dueDate = document.createElement('div');

        const dateLabel = document.createElement('label');
        dateLabel.classList.add('dateLabel');
        dateLabel.setAttribute('for', 'inputDueDate');
        dateLabel.textContent = 'Due Date:';

        const inputDueDate = document.createElement('input');
        inputDueDate.type = 'date';
        inputDueDate.id = 'inputDueDate';
        inputDueDate.name = 'trip-start';

        dueDate.append(dateLabel, inputDueDate);
        return dueDate;

    }

    const addPriorityOptions = () => {
        // A wrapper is going to wrap the label and a container consisting of the radio options.
        const inputPrioWrapper = document.createElement('div');
        inputPrioWrapper.classList.add('prioWrapper');
        
        const labelDiv = document.createElement('div');
        labelDiv.classList.add('prioLabel');
        labelDiv.textContent = "How important is this task?";
        
        const prioOptionsContainer = document.createElement('div');
        prioOptionsContainer.classList.add('prioOptions');
        
        const prioOptions = [
            { id: 'lowPrio', value: 'low' },
            { id: 'medPrio', value: 'medium' },
            { id: 'highPrio', value: 'high' },
        ];
        
        for (let { id, value } of prioOptions) {
            const radioOptionContainer = document.createElement('div');
            const input = document.createElement('input');
        
            const attributes = {
            type: 'radio',
            id,
            name: 'prio',
            value
            };
            
            Object.assign(input, attributes); 
        
            const label = document.createElement('label');
            label.setAttribute('for', id);
            label.classList.add(id);
            label.textContent = value;
                    
            radioOptionContainer.appendChild(input);
            radioOptionContainer.appendChild(label);
            prioOptionsContainer.appendChild(radioOptionContainer);
        }
        
        inputPrioWrapper.appendChild(labelDiv);
        inputPrioWrapper.appendChild(prioOptionsContainer);
        
        return inputPrioWrapper;
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

        Object.entries(attributes).forEach(
            ([attrIdx, attrValue]) => inputTextArea.setAttribute(attrIdx, attrValue));

        inputTextArea.required = required; // Default True

        input.appendChild(inputLabel);
        input.appendChild(inputTextArea);
        return input
    }


    const addInputText = (labelName, placeholder, id, required=true) => {
        const input = document.createElement('div');

        const inputLabel = document.createElement('label');
        inputLabel.htmlFor = id;
        inputLabel.textContent = labelName;

        const inputText = document.createElement('input');
        const attributes = {
            type: 'text',
            id,
            name: id,
            placeholder
        };
        Object.entries(attributes).forEach(([attr, value]) => {
            inputText.setAttribute(attr, value)
        });

        inputText.required = required; 

        input.append(inputLabel, inputText);
        return input;
    }
    
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
    return { addTask, clear, collectTaskInfo, addProj };


}