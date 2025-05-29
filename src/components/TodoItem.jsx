import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const [editable, setEditable] = useState(false);
  const [text, setText] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const handleEdit = () => {
    updateTodo(todo.id, { ...todo, todo: text });
    setEditable(false);
  };

  return (
    <div
      className={`flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 shadow-sm transition-all duration-300 ${
        todo.completed ? 'bg-gray-100' : 'bg-indigo-50'
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer accent-indigo-500 w-5 h-5"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <input
        type="text"
        className={`flex-1 bg-transparent outline-none text-base ${
          editable ? 'border border-gray-300 px-2 py-1 rounded' : 'border-none'
        } ${todo.completed ? 'line-through text-gray-400' : 'text-[#111827]'}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        readOnly={!editable}
      />
      <button
        onClick={() => {
          if (todo.completed) return;
          editable ? handleEdit() : setEditable(true);
        }}
        disabled={todo.completed}
        className="text-green-600 hover:text-green-800 disabled:opacity-50"
        title={editable ? 'Save' : 'Edit'}
      >
        {editable ? '💾' : '✏️'}
      </button>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700"
        title="Delete"
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;