import { useEffect, useState } from 'react'
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import type { Filter } from '../../types/filter';
import type { TodoProps } from '../../types/todo';

export default function TodoList({ filter }: {filter: Filter}) {
    const [todos, setTodos] = useState(() => readTodosFromLocalStorage());

  useEffect( () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (deleted: TodoProps) => setTodos( todos.filter ( (todo: TodoProps) => todo.id != deleted.id ) );
  const handleUpdate = (updated: TodoProps) => setTodos( todos.map( (todo: TodoProps)  => ( todo.id === updated.id ? updated : todo )  ) );

  const handleAdd = (newTodo: TodoProps) => {
    setTodos([...todos, newTodo])
  }

  const filtered = getFilteredTodos(todos, filter)
  return (
    <>
      <ul>
        {
          filtered.map( (todo: TodoProps) => <Todo key={todo.id} todo={todo} onDelete={handleDelete} onUpdate={handleUpdate}/>
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

function getFilteredTodos(todos: TodoProps[], filter: Filter) {
    if ( filter == 'all') {
        return todos;
    }

    return todos.filter( (t: TodoProps) => t.status === filter);
}