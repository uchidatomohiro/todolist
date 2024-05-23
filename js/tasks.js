document.addEventListener('DOMContentLoaded', () => {
    let tasks = [];

    // タスクを追加する関数
    function addTask(title, description) {
        const newTask = {
            id: tasks.length + 1,
            title: title,
            description: description,
            completed: false,
        };
        tasks.push(newTask);
        saveTasksToJSON();
        renderTasks();
    }

    // タスクを削除する関数
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasksToJSON();
        renderTasks();
    }

    // タスクを完了にする関数
    function completeTask(taskId) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            saveTasksToJSON();
            renderTasks();
        }
    }

    // タスクのリストを表示する関数
    function renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';
            if (task.completed) {
                taskDiv.classList.add('completed');
            }
            taskDiv.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <button onclick="completeTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;
            taskList.appendChild(taskDiv);
        });
    }

    // タスクをJSON形式で保存する関数
    function saveTasksToJSON() {
        const jsonTasks = JSON.stringify(tasks);
        localStorage.setItem('tasks', jsonTasks);
    }

    // JSON形式で保存されたタスクを読み込む関数
    function loadTasksFromJSON() {
        const jsonTasks = localStorage.getItem('tasks');
        if (jsonTasks) {
            tasks = JSON.parse(jsonTasks);
        }
        renderTasks();
    }

    // 初期化時にタスクを読み込む
    loadTasksFromJSON();

    // フォームの送信イベントを処理する
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        addTask(title, description);
        taskForm.reset();
    });
    
    // 関数をグローバルにする
    window.completeTask = completeTask;
    window.deleteTask = deleteTask;
});