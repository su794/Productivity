import { useEffect, useState } from 'react';
import styles from './EventModal.module.css';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button/Button';
import { useModalStatus } from '../../context/useModalStatus';
import type { CalendarEvent } from '../../types/calendarEvent';

interface EventModalProps {
    modalType: 'add' | 'edit';
    onAdd: (event: CalendarEvent) => void;
    onEdit: (id:string, title:string) => void;
    start: string;
    end: string;
    event: CalendarEvent | null;
}

export default function EventModal({ modalType, onAdd, onEdit, start, end, event }: EventModalProps) {
    const [title, setTitle] = useState('');
    const [emptyText, setEmptyText] = useState(true);
    const { modalStatus, toggleModalStatus } = useModalStatus();
    
    const displayCalendarDate = start.toString();
    const displayFormattedDate = new Date(displayCalendarDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    useEffect( () => {
        if( modalType === 'add' ) {
            setTitle('');
            setEmptyText(true);
        } else if ( modalType === 'edit' && event ) {
setTitle(event.title);
setEmptyText(false);
        }
        // if(event) {

        //     console.log(event);
            
        //     setTitle(event?.title);
        //     setEmptyText(false);
        // }
    }, [event, modalType])

//     useEffect( () => {
//         if(modalType === 'add') {
//             setTitle('');
//         } else {
// setTitle(event.title);
//         }
//     }, [modalType])
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if ( e.target.value.trim() === '' ) {
            setTitle('');
            setEmptyText(true);
        } else {
            setTitle(e.target.value);
            setEmptyText(false);
        }
    };
    const handleClickClose = () => {
        toggleModalStatus();
        
        setTitle('');
        setEmptyText(true);
    }

    const handleClickAdd = () => {

        if(title.trim().length === 0) {
            setEmptyText(true);
            return;
        }

        onAdd({id: uuidv4(), title, start: new Date(start), end: new Date(end)});
        console.log(modalType);
        
        toggleModalStatus();

        setTitle('');
        setEmptyText(true);
    }

    const handleClickEdit = () => {
        if(title.trim().length === 0) {
            setEmptyText(true);
            return;
        }

        if( event === null ) return;

        onEdit(event.id, title);

        console.log(modalType, event);
        toggleModalStatus();

        setTitle('');
        setEmptyText(true);
    }

    const handleClickDelete = () => {}

    return (
    <div    
        className={`${modalStatus ? 'open' : 'close'} ${styles.bg}`}
    >
        <h3>{ modalType === 'add' ? 'Add a new Event' : 'Edit the event' } on { displayFormattedDate }</h3>
        <div className={styles.inputs}>
            <input 
                type='text'
                value={title}
                onChange={handleTitleChange}
            />
            <Button text={'Cancel'} onClick={handleClickClose} />
            { modalType === 'add' && <Button text={'Submit'} onClick={handleClickAdd} className={emptyText ? 'invalid' : ''} />}
            { modalType === 'edit' && (
                <>
                    <Button text={'Edit'} onClick={handleClickEdit} className={emptyText ? 'invalid' : ''} />
                    <Button text={'Delete'} onClick={handleClickDelete} className='alert' />    
                </>
            )}
        </div>
    </div>
  )
}