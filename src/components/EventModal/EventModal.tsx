import { useState } from 'react';
import styles from './EventModal.module.css';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button/Button';
import { useModalStatus } from '../../context/useModalStatus';
import type { CalendarEvent } from '../../types/calendarEvent';

interface EventModalProps {
    modalType: 'add' | 'edit';
    onAdd: (event: CalendarEvent) => void;
    onEdit: (id:string, title:string) => void;
    onDelete: (id: string) => void;
    start: string;
    end: string;
    event: CalendarEvent | null;
}

export default function EventModal({ modalType, onAdd, onEdit, onDelete, start, end, event }: EventModalProps) {
    const [title, setTitle] = useState( event?.title ?? '' );
    
    const { modalStatus, closeModal } = useModalStatus();
    
    const displayCalendarDate = start.toString();
    const displayFormattedDate = new Date(displayCalendarDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if ( e.target.value.trim() === '' ) {
            setTitle('');
        } else {
            setTitle(e.target.value);
        }
    };
    const handleClickClose = () => {
        closeModal();
    }

    const handleClickAdd = () => {

        if(title.trim().length === 0) {
            return;
        }

        onAdd({id: uuidv4(), title, start: new Date(start), end: new Date(end)});
        console.log(modalType);
        
        closeModal();
    }

    const handleClickEdit = () => {
        if(title.trim().length === 0) {
            return;
        }

        if( event === null ) return;

        onEdit(event.id, title);

        console.log(modalType, event);
        closeModal();
    }

    const handleClickDelete = () => {
        if( event === null ) return;
        
        onDelete(event.id);
        closeModal();
    }

    return <>
        {modalStatus && 
        <div    
            className={`${ modalStatus === true ? 'open' : 'close' } ${styles.bg}`}
        >
            <h3>{ modalType === 'add' ? 'Add a new Event' : 'Edit the event' } on { displayFormattedDate }</h3>
            <div className={styles.inputs}>
                <input 
                    type='text'
                    value={title}
                    onChange={handleTitleChange}
                />
                <Button text={'Cancel'} onClick={handleClickClose} />
                { modalType === 'add' && <Button text={'Submit'} onClick={handleClickAdd} className={title === '' ? 'invalid' : ''} />}
                { modalType === 'edit' && (
                    <>
                        <Button text={'Edit'} onClick={handleClickEdit} className={title === '' ? 'invalid' : ''} />
                        <Button text={'Delete'} onClick={handleClickDelete} className='alert' />    
                    </>
                )}
            </div>
        </div>
        
        }
    </>
        
    
}