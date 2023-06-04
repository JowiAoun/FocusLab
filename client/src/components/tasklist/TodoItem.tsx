import PropTypes from 'prop-types';

function TodoItem(props: any) {
  let textDecorationClass = props.todo.completed ? 'line-through' : 'no-underline';
  let textColorClass = props.todo.completed ? 'text-pink-600' : 'text-gray-800';

  return (
    <li
      className={`flex items-center space-x-1 py-2.5 px-2.5 border-b border-gray-300 transition duration-300 ease-in w-fit ${textDecorationClass} ${textColorClass}`}
      data-testid="todo-item"
    >
      <input
        name="completed-checkbox"
        type="checkbox"
        className="form-checkbox rounded text-pink-600 shadow-none focus:shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none max-w-md "
        checked={props.todo.completed}
        value={props.todo.completed}
        onChange={() => props.markComplete(props.todo.id)}
        data-testid="task-completed-checkbox"
      />
      <span className="flex-1 px-2 min-w-0 break-words max-w-sm">{props.todo.title}</span>
      <button
        onClick={() => props.delTodo(props.todo.id)}
        className="transition duration-200 ease-in-out text-gray-400 hover:text-pink-500 focus:outline-none"
        data-testid="delete-task-btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8s8-3.582 8-8s-3.581-8-8-8zm3.707 10.293a.999.999 0 1 1-1.414 1.414L12 13.414l-2.293 2.293a.997.997 0 0 1-1.414 0a.999.999 0 0 1 0-1.414L10.586 12L8.293 9.707a.999.999 0 1 1 1.414-1.414L12 10.586l2.293-2.293a.999.999 0 1 1 1.414 1.414L13.414 12l2.293 2.293z"
          />
        </svg>
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
};

export default TodoItem;
