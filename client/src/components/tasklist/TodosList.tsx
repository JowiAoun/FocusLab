import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddTodo from './AddTodo';
import TodosFooter from './TodosFooter';
import TodoItem from './TodoItem';
import Draggable from 'react-draggable';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

function TodosList({ id, position, onDelete }: { id: number; position: any; onDelete: Function }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Add a new todo item
  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  // Delete a todo item
  const delTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle completed state of todo item
  const markComplete = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };
  // Handling Draggable Component
  const handleDelete = () => {
    onDelete(id);
  };
  return (
    <Draggable bounds=".notes-container" handle=".handle">
      <div className="timer p-2 w-fit max-w-lg">
        <div className="handle">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 256 256">
            <path
              fill="currentColor"
              d="M76 92a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm52-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm68 32a16 16 0 1 0-16-16a16 16 0 0 0 16 16ZM60 148a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"
            />
          </svg>
        </div>
        <button className="delete-btn" onClick={handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
            <path
              fill="currentColor"
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"
            />
          </svg>
        </button>

        <div className="flex flex-col bg-gray-200 rounded shadow-lg w-min-40 max-w-lg m-0 w-fit">
          <AddTodo addTodo={addTodo} />

          <div className="mx-4 my-6 h-fit max-h-96 overflow-auto max-w-md">
            {todos.length > 0 ? (
              // If there are todo items, show them in a list
              <ul className="mt-4" data-testid="todos-list">
                {todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} markComplete={markComplete} delTodo={delTodo} />
                ))}
              </ul>
            ) : (
              // No todo items, all caught up
              <p className="my-16 text-lg text-center text-gray-500" data-testid="empty-todos-message">
                You're all caught up!
              </p>
            )}
          </div>

          <TodosFooter totalTasks={todos.length} doneTasks={todos.filter((todo) => todo.completed).length} />
        </div>
      </div>
    </Draggable>
  );
}

export default TodosList;
