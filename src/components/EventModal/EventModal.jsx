import React, { useState } from 'react';
import styles from './EventModal.module.css';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button/Button';
import { useModalStatus } from '../../context/ModalStatusContext';

export default function EventModal({ modalType, onClose, onConfirm, start, end }) {
    const [title, setTitle] = useState('');
    const { modalStatus, toggleModalStatus } = useModalStatus();
    
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleClickClose = () => toggleModalStatus(!modalStatus);

    const handleClickConfirm = () => {

        if(title.trim().length === 0) {
            return;
        }

        onConfirm({id: uuidv4(), title, start, end});

        toggleModalStatus(!modalStatus);

        setTitle('');
    }

    return (
    <div    
        className={`${modalStatus ? 'open' : 'close'} ${styles.bg}`}
    >
        <h3>{ modalType === 'add' ? 'Add a new Event' : 'Edit the event' } on { start.toString() }</h3>
        <div className={styles.inputs}>
            <input 
                type='text'
                value={title}
                onChange={handleTitleChange}
            />
            <Button text={'Cancel'} onClick={handleClickClose} />
            <Button text={'Submit'} onClick={handleClickConfirm} />
        </div>
    </div>
  )
}