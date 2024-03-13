import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from "./TodoList.jsx";
import FilterButtons from "./FilterButtons.jsx";
import { BsSearch, BsPlus } from "react-icons/bs";
import { addTodo, updateSearchTerm } from "../redux/action.js";
import { useEffect } from 'react';

const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);

  const fetchCurrentTime = async () => {
    try {
      const response = await fetch('https://worldtimeapi.org/api/ip');
      const data = await response.json();
      const rawDateTime = new Date(data.utc_datetime);
      const formattedDateTime = `${rawDateTime.toLocaleDateString()} ${rawDateTime.toLocaleTimeString()}`;
      setCurrentTime(formattedDateTime);
    } catch (error) {
      console.error('Error fetching current time:', error);
    }
  };

  useEffect(() => {
    fetchCurrentTime();
  }, []);

  const handleAddTodoWithLoading = async (text) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleAddTodo(text);
    setIsLoading(false);
  
  };

  const handleAddTodo = (text) => {
    dispatch(addTodo(text));
  };

  const handleAddTodoClick = () => {
    if (newTodoText.trim() !== '') {
      handleAddTodoWithLoading(newTodoText.trim());
      setNewTodoText('');
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };

  return (
    <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-gray-100 rounded">
      <h2 className='mt-3 mb-6 text-2xl font-bold text-center uppercase'>TODO APP</h2>
      <div className="flex items-center mb-4">
        <p className="text-gray-600">Current Time: {currentTime}</p>
      </div>
      <div className="flex items-center mb-4">
        <input
          id="addTodoInput"
          className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Add Todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleAddTodoClick}
        >
          {isLoading ? 'Loading...' : <BsPlus size={20} />}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <FilterButtons />
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
            <BsSearch size={20} />
          </button>
        </div>
      </div>

      <TodoList />
    </div>
  );
};

export default Todo;