const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:8080' 
    : (window.ENV?.API_BASE || ''); 

const API_URL = `${API_BASE}/tasks`;

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function renderTasks(tasks) {
    const tableBody = document.getElementById('taskTableBody');
    tableBody.innerHTML = '';

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.taskName}</td>
            <td style="color: #888; font-size: 0.9rem;">${new Date(task.createdAt).toLocaleString()}</td>
            <td><span class="status-badge status-${task.status}">${task.status}</span></td>
            <td>
                ${task.status !== 'Completed' ? `<button class="action-btn" onclick="updateStatus(${task.id})">Next Step</button>` : ''}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function addTask() {
    const input = document.getElementById('taskName');
    const taskName = input.value.trim();

    if (!taskName) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ taskName })
        });
        
        if (response.ok) {
            input.value = '';
            fetchTasks();
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

async function updateStatus(id) {
    try {
        const response = await fetch(`${API_URL}/${id}/status`, {
            method: 'PUT'
        });
        
        if (response.ok) {
            fetchTasks();
        }
    } catch (error) {
        console.error('Error updating status:', error);
    }
}

// Initial fetch
fetchTasks();
