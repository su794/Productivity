import React, { useState } from 'react';
import styles from './EventModal.module.css';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button/Button';

export default function EventModal({ modalType, modalStatus, onClose, onConfirm, start, end }) {
    const [title, setTitle] = useState('');
    //console.log(start, end);
    
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleClickClose = () => onClose('modal-close');

    const handleClickConfirm = () => {

        if(title.trim().length === 0) {
            return;
        }

        onConfirm({id: uuidv4(), title, start, end});

        onClose('modal-close');

        setTitle('');
    }
    return (
    <div    
        className={`${styles[modalStatus]} ${styles.bg}`}
    >
        <h3>{ modalType === 'add' ? 'Add a new Event' : 'Edit the event' } on { start.toString() }</h3>
        <input 
            type='text'
            value={title}
            onChange={handleTitleChange}
        />
        <Button text={'Cancel'} onClick={handleClickClose} />
        {/* <button
            onClick={handleClickClose}
        >Cancel</button> */}
        <button
            onClick={handleClickConfirm}
        >Submit</button>
    </div>
  )
}