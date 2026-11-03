import { useState } from 'react';
import styles from './EventModal.module.css';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button/Button';
import { useModalStatus } from '../../context/ModalStatusContext';
import type { CalendarEvent } from '../../types/calendarEvent';

interface EventModalProps {
    modalType: string;
    onConfirm: (event: CalendarEvent) => void;
    start: string;
    end: string;
}

export default function EventModal({ modalType, onConfirm, start, end }: EventModalProps) {
    const [title, setTitle] = useState('');
    const [emptyText, setEmptyText] = useState(true);
    const { modalStatus, toggleModalStatus } = useModalStatus();
    
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim() === '') {
            setTitle('');
            setEmptyText(true);
        } else {
            setTitle(e.target.value);
            setEmptyText(false);
        }
        
        // setTitle(e.target.value);
        // setEmptyText(false);
    };
    const handleClickClose = () => {
        toggleModalStatus();
        setTitle('');
        setEmptyText(true);
    }

    const handleClickConfirm = () => {

        if(title.trim().length === 0) {
            setEmptyText(true);
            return;
        }

        onConfirm({id: uuidv4(), title, start: new Date(start), end: new Date(end)});

        toggleModalStatus();

        setTitle('');
        setEmptyText(true);
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
            <Button text={'Submit'} onClick={handleClickConfirm} className={emptyText ? 'invalid' : ''} />
        </div>
    </div>
  )
}