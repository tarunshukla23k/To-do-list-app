document.getElementById('new-task').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('task-list');

    const listItem = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.onclick = toggleTaskCompletion;

    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
    editButton.className = 'edit';
    editButton.onclick = editTask;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
    deleteButton.onclick = deleteTask;

    listItem.appendChild(taskSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    taskInput.value = '';

    updateTaskCounter();
}

function deleteTask(e) {
    const listItem = e.target.closest('li');
    listItem.remove();
    updateTaskCounter();
}

function toggleTaskCompletion(e) {
    const taskSpan = e.target;
    taskSpan.parentElement.classList.toggle('completed');
    updateTaskCounter();
}

function editTask(e) {
    const listItem = e.target.closest('li');
    const taskSpan = listItem.querySelector('span');
    const originalText = taskSpan.textContent;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalText;

    listItem.classList.add('editing');
    listItem.replaceChild(input, taskSpan);

    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            taskSpan.textContent = input.value.trim();
            listItem.classList.remove('editing');
            listItem.replaceChild(taskSpan, input);
            updateTaskCounter();
        }
    });

    input.addEventListener('blur', function() {
        taskSpan.textContent = input.value.trim();
        listItem.classList.remove('editing');
        listItem.replaceChild(taskSpan, input);
        updateTaskCounter();
    });
}

function updateTaskCounter() {
    const taskList = document.getElementById('task-list');
    const tasksRemaining = taskList.querySelectorAll('li:not(.completed)').length;
    document.getElementById('task-counter').textContent = `Tasks remaining: ${tasksRemaining}`;
}
