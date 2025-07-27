// Todo App Logic
class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.init();
    }

    loadTodos() {
        if (typeof localStorage !== 'undefined') {
            return JSON.parse(localStorage.getItem('todos')) || [];
        }
        return [];
    }

    init() {
        if (typeof document !== 'undefined') {
            this.todoInput = document.getElementById('todoInput');
            this.addBtn = document.getElementById('addBtn');
            this.todoList = document.getElementById('todoList');
            this.taskCount = document.getElementById('taskCount');
            this.clearCompletedBtn = document.getElementById('clearCompleted');

            if (this.addBtn) {
                this.addBtn.addEventListener('click', () => this.addTodo());
            }
            if (this.todoInput) {
                this.todoInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.addTodo();
                });
            }
            if (this.clearCompletedBtn) {
                this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
            }

            this.render();
        }
    }

    addTodo() {
        const text = this.todoInput ? this.todoInput.value.trim() : '';
        if (text) {
            const todo = {
                id: Date.now(),
                text: text,
                completed: false
            };
            this.todos.push(todo);
            if (this.todoInput) {
                this.todoInput.value = '';
            }
            this.save();
            this.render();
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.save();
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.save();
        this.render();
    }

    clearCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
        this.save();
        this.render();
    }

    save() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        }
    }

    render() {
        if (typeof document !== 'undefined' && this.todoList) {
            this.todoList.innerHTML = '';
            this.todos.forEach(todo => {
                const li = document.createElement('li');
                li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    <div>
                        <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                               onchange="app.toggleTodo(${todo.id})">
                        <span>${todo.text}</span>
                    </div>
                    <button class="delete-btn" onclick="app.deleteTodo(${todo.id})">Delete</button>
                `;
                this.todoList.appendChild(li);
            });
            
            if (this.taskCount) {
                this.taskCount.textContent = `${this.todos.length} task${this.todos.length !== 1 ? 's' : ''}`;
            }
        }
    }
}

// Initialize app only in browser environment
if (typeof window !== 'undefined') {
    window.app = new TodoApp();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TodoApp;
}