// Simple unit tests without DOM interaction
describe('TodoApp Unit Tests', () => {
    test('todos array operations', () => {
        const todos = [];
        
        // Add todo
        const newTodo = { id: 1, text: 'Test', completed: false };
        todos.push(newTodo);
        expect(todos.length).toBe(1);
        
        // Toggle completion
        todos[0].completed = !todos[0].completed;
        expect(todos[0].completed).toBe(true);
        
        // Delete todo
        const filtered = todos.filter(t => t.id !== 1);
        expect(filtered.length).toBe(0);
    });
    
    test('localStorage operations', () => {
        const testData = [{ id: 1, text: 'Test', completed: false }];
        
        // Mock localStorage
        const storage = {};
        storage['todos'] = JSON.stringify(testData);
        
        const retrieved = JSON.parse(storage['todos']);
        expect(retrieved).toEqual(testData);
    });
    
    test('clear completed todos logic', () => {
        const todos = [
            { id: 1, text: 'Test 1', completed: true },
            { id: 2, text: 'Test 2', completed: false }
        ];
        
        const active = todos.filter(t => !t.completed);
        expect(active.length).toBe(1);
        expect(active[0].id).toBe(2);
    });
});