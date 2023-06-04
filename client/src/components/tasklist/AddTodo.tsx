import { useState } from 'react';
import PropTypes from 'prop-types';

function AddTodo(props: any) {
  const [title, setTitle] = useState('');

  const onSubmit = (evt: { preventDefault: () => void }) => {
    // Stop form being submmited to same file and reloading the page
    evt.preventDefault();

    // Validate todo text
    if (!title) {
      alert('Please add a task description.');
      return;
    }

    props.addTodo(title);

    // Clear task text in component state
    setTitle('');
  };

  return (
    <div className="mx-4 mt-6">
      <form
        onSubmit={onSubmit}
        className="flex items-center transition duration-500 ease-in-out py-2 border-b-2 border-gray-300 focus-within:border-b-2 focus-within:border-pink-600"
      >
        <input
          name="task-title"
          type="text"
          placeholder="Add task..."
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
          className="flex-1 px-2.5 bg-gray-200 placeholder-gray-500 focus:outline-none w-7"
          data-testid="task-input-field"
        />
        <button
          type="submit"
          className="transition duration-200 ease-in-out text-gray-400 focus:outline-none hover:text-pink-500 text-lg px-2 cursor-pointer"
          data-testid="task-submit-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
            <mask id="ipSAdd0">
              <g fill="none" stroke-linejoin="round" stroke-width="4">
                <rect width="36" height="36" x="6" y="6" fill="#fff" stroke="#fff" rx="3" />
                <path stroke="#000" stroke-linecap="round" d="M24 16v16m-8-8h16" />
              </g>
            </mask>
            <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSAdd0)" />
          </svg>
        </button>
      </form>
    </div>
  );
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
