import { useDispatch } from 'react-redux';
import {
  toggleTodo,
  removeTodo,
  markCompleted,
  markIncomplete,
  updateTodo,
} from '../redux/action.js';
import { FaToggleOn, FaToggleOff, FaTrash, FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import { useState } from 'react';

const TodoItem = ({ todo, index }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (e) => {
    dispatch(updateTodo(index, e.target.value));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4">
    <div className="flex items-center">
      <span className="mr-4 text-gray-500">
        {index + 1}.
      </span>
      {isEditing ? (
        <input
          type="text"
          value={todo.text}
          onChange={handleUpdate}
          className="border p-1 mr-4"
        />
      ) : (
        <span className={`mr-4 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.text}
        </span>
      )}
    </div>
      <div className='space-x-3 ml-8'>
        <button
          className="mr-2 text-sm bg-blue-500 text-white sm:px-2 px-1 py-1 rounded"
          onClick={() => dispatch(toggleTodo(index))}
        >
          {todo.completed ? <FaToggleOff /> : <FaToggleOn />}
        </button>
        <button
          className="mr-2 text-sm bg-red-500 text-white sm:px-2 px-1 py-1 rounded"
          onClick={() => dispatch(removeTodo(index))}
        >
          <FaTrash />
        </button>
        {!todo.completed && (
          <button
            className="text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => dispatch(markCompleted(index))}
          >
            <FaCheck />
          </button>
        )}
        {todo.completed && (
          <button
            className="text-sm bg-yellow-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={() => dispatch(markIncomplete(index))}
          >
            <FaTimes />
          </button>
        )}
        <button
          className="text-sm bg-orange-500 text-white sm:px-2 px-1 py-1 rounded"
          onClick={handleEdit}
        >
          <FaEdit />
        </button>
        {isEditing && (
          <button
            className="text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;