import React, { useEffect, useState } from 'react'
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';

export default function TodoList({ filter }) {
    const [todos, setTodos] = useState(() => readTodosFromLocalStorage());

  useEffect( () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (deleted) => setTodos( todos.filter ( todo => todo.id != deleted.id ) );
  const handleUpdate = (updated) => setTodos( todos.map( todo  => ( todo.id === updated.id ? updated : todo )  ) );

  const handleAdd = (newTodo) => {
    setTodos([...todos, newTodo])
  }

  const filtered = getFilteredTodos(todos, filter)
  return (
    <>
      <ul>
        {
          filtered.map( (todo) => <Todo key={todo.id} todo={todo} onDelete={handleDelete} onUpdate={handleUpdate}/>
          )
        }
      </ul>
      <AddTodo onAdd={handleAdd} />
    </>
  )
}

function readTodosFromLocalStorage() {
    const storedTodos = localStorage.getItem('todos');
  
  return storedTodos ? JSON.parse(storedTodos) : [];
}

function getFilteredTodos(todos, filter) {
    if ( filter == 'all') {
        return todos;
    }

    return todos.filter( t => t.status === filter);
}