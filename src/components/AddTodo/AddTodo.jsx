import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddTodo.module.css';
import Button from '../Button/Button';

export default function AddTodo({onAdd}) {
    const [text, setText] = useState('');
    const handleChange = (e) => setText(e.target.value);
    const handleAddTodo = (e) => {
        e.preventDefault();
        if(text.trim().length === 0) {
            return;
        }
        onAdd({
            id: uuidv4(),
            text,
            status: 'active',
        });
        localStorage.setItem('todos', JSON.stringify(text));

        setText('');
    }
  return (
    <form onSubmit={handleAddTodo} className={styles.form}>
        <input className={styles.input} placeholder='Add Todo' type="text" id="todo" name="todo" value={text} onChange={handleChange} />
        <Button className={styles.button} text='Add' />
    </form>
  )
}
