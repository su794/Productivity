import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import styles from './Todo.module.css';

export default function Todo({ todo, onUpdate, onDelete }) {
  const handleUpdate = (e) => {
    let status = ( e.target.checked ? 'complete' : 'active' );
    onUpdate({...todo, status});
}

const handleDelete = () => {
    onDelete(todo);
}
  return (
    <li key={todo.id}>
        <input type="checkbox" checked={ ( todo.status === 'complete' )} onChange={handleUpdate} />
        { todo.text }
        <span>
            <button onClick={handleDelete}>
                <FaTrashAlt />
            </button>
        </span>
    </li>
  )
}
