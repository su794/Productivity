import React from 'react';
import { ImBin } from "react-icons/im";
import styles from './Todo.module.css';

export default function Todo({ todo, onUpdate, onDelete }) {
    const { text, status, id } = todo;
    const handleUpdate = (e) => {
        const status = e.target.checked ? 'completed' : 'active';
        onUpdate({...todo, status})
    }

    const handleDelete = () => {onDelete(todo)}
  return (
    <li className={styles.todo} key={todo.id}>
    <input
        className={styles.checkbox} 
        type="checkbox"
        id={id}
        checked={status === 'completed'}
        onChange={handleUpdate}
    />
    <label className={styles.text} htmlFor={id}>{text}</label>
    <span className={styles.icon}>
        <button className={styles.button} onClick={handleDelete}><ImBin /></button>
    </span>
    </li>
  )
}
