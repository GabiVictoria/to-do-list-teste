document.addEventListener('DOMContentLoaded', fetchTasks);

async function fetchTasks() {
    const response = await fetch('/tasks', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    
    if (!response.ok) {
        console.error('Erro ao buscar tarefas:', response.statusText);
        return;
    }
    
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        taskList.innerHTML += `
            <div>
                <span>${task.title} - ${task.status}</span>
                <button onclick="updateTask(${task.id})">Alterar Status</button>
                <button onclick="deleteTask(${task.id})">Excluir</button>
            </div>
        `;
    });
}

document.getElementById('addTaskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value;

    const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title })
    });

    if (response.ok) {
        fetchTasks();
        document.getElementById('taskTitle').value = ''; // Limpa o campo após adicionar
    } else {
        console.error('Erro ao adicionar tarefa:', response.statusText);
    }
});

async function updateTask(id) {
    const response = await fetch(`/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: 'completa' })
    });

    if (response.ok) {
        fetchTasks();
    } else {
        console.error('Erro ao atualizar tarefa:', response.statusText);
    }
}

async function deleteTask(id) {
    const response = await fetch(`/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });

    if (response.ok) {
        fetchTasks();
    } else {
        console.error('Erro ao excluir tarefa:', response.statusText);
    }
}
