// Task Management Application
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.render();
        this.updateStats();
    }

    cacheDOM() {
        this.taskInput = document.getElementById('taskInput');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.tasksContainer = document.getElementById('tasksContainer');
        this.emptyState = document.getElementById('emptyState');
        this.filterTabs = document.querySelectorAll('.tab');
        this.totalTasksEl = document.getElementById('totalTasks');
        this.completedTasksEl = document.getElementById('completedTasks');
        this.pendingTasksEl = document.getElementById('pendingTasks');
    }

    bindEvents() {
        // Add task
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter tabs
        this.filterTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.filterTabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });
    }

    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) {
            this.shakeInput();
            return;
        }

        const task = {
            id: Date.now(),
            text: text,
            priority: this.prioritySelect.value,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.taskInput.value = '';
        this.render();
        this.updateStats();
        this.animateButton();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
            this.updateStats();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.render();
        this.updateStats();
    }

    filterTasks() {
        switch(this.currentFilter) {
            case 'completed':
                return this.tasks.filter(t => t.completed);
            case 'pending':
                return this.tasks.filter(t => !t.completed);
            default:
                return this.tasks;
        }
    }

    render() {
        const filteredTasks = this.filterTasks();
        
        if (filteredTasks.length === 0) {
            this.tasksContainer.innerHTML = '';
            this.emptyState.classList.add('show');
            return;
        }

        this.emptyState.classList.remove('show');
        this.tasksContainer.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');
        
        // Bind events to new elements
        this.tasksContainer.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.task-card').dataset.id);
                this.toggleTask(id);
            });
        });

        this.tasksContainer.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.task-card').dataset.id);
                this.deleteTask(id);
            });
        });
    }

    createTaskHTML(task) {
        const date = new Date(task.createdAt);
        const timeAgo = this.getTimeAgo(date);
        
        return `
            <div class="task-card priority-${task.priority} ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-header">
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}"></div>
                    <div class="task-content">
                        <div class="task-text">${this.escapeHTML(task.text)}</div>
                        <div class="task-meta">
                            <span class="priority-badge ${task.priority}">${task.priority}</span>
                            <span>•</span>
                            <span>${timeAgo}</span>
                        </div>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-delete">Delete</button>
                </div>
            </div>
        `;
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;

        this.animateNumber(this.totalTasksEl, total);
        this.animateNumber(this.completedTasksEl, completed);
        this.animateNumber(this.pendingTasksEl, pending);
    }

    animateNumber(element, target) {
        const current = parseInt(element.textContent) || 0;
        const increment = target > current ? 1 : -1;
        const duration = 300;
        const steps = Math.abs(target - current);
        const stepDuration = steps > 0 ? duration / steps : 0;

        let value = current;
        const timer = setInterval(() => {
            value += increment;
            element.textContent = value;
            if (value === target) {
                clearInterval(timer);
            }
        }, stepDuration);
    }

    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
            }
        }
        
        return 'just now';
    }

    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    shakeInput() {
        this.taskInput.style.animation = 'none';
        setTimeout(() => {
            this.taskInput.style.animation = 'shake 0.5s';
        }, 10);
    }

    animateButton() {
        this.addTaskBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.addTaskBtn.style.transform = '';
        }, 150);
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
    
    // Add some visual polish
    console.log('%c TaskFlow ', 'background: #FF6B35; color: white; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Ready to organize your tasks! ', 'background: #4ECDC4; color: white; font-size: 14px; padding: 5px;');
});

// Add service worker for PWA capabilities (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration can be added here for offline support
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus task input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('taskInput').focus();
    }
});
