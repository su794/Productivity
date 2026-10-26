import { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer, type SlotInfo } from 'react-big-calendar';
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import EventModal from '../EventModal/EventModal';
import styles from './Events.module.css';
import { useModalStatus } from '../../context/ModalStatusContext';
import type { CalendarEvent } from '../../types/calendarEvent';
import { enUS } from 'date-fns/locale';

const locales = {
    "en-US": enUS
  }
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  });
  

export default function Events() {
  const { toggleModalStatus } = useModalStatus();
  const [events, setEvents] = useState(() => readEventsFromLocalStorage());

  // const [startDate, setStartDate] = useState( null );
  const [startDatePicker, setStartDatePicker] = useState('');
  const [endDatePicker, setEndDatePicker] = useState('');

  //const [modalStatus, setModalStatus] = useState('modal-close');
  const [modalType, setModalType] = useState('');

  useEffect( () => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events] )

  const [newEvent, _setNewEvent] = useState({id: uuidv4(), title: "", start: "", end: ""});

  const handleSelect = (slotInfo: SlotInfo) => {
    //setModalStatus('modal-open');
    setModalType('add');
  
    setStartDatePicker(slotInfo.start.toISOString());
    setEndDatePicker(slotInfo.end.toISOString());
    console.log(slotInfo.start, slotInfo.end);
    toggleModalStatus();
  }

  const handleDateClick = (e: any) => {
    //setModalStatus('modal-open');
    setModalType('edit');
    setStartDatePicker(e.start);
    console.log(e);
  };

  //const handleModalClose = (status) => setModalStatus(status);
  const handleModalConfirm = (eModal: CalendarEvent) => { 
    console.log(eModal);
    const { id, title, start, end } = eModal; 
    setEvents([...events, {id, title, start, end}]);

    localStorage.setItem('events', JSON.stringify(newEvent));

  }
  return (
    <div className={styles.calendar}>
        <h2>Canlendar</h2>
        <div>
        </div>
        <Calendar
            views={["month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            events={events} 
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
            onSelectSlot={handleSelect}
            onSelectEvent={(e)=>handleDateClick(e)}
        />
        <EventModal
          modalType={modalType}
          onConfirm={handleModalConfirm}
          start={startDatePicker}
          end={endDatePicker}
        />
    </div>
    
  )
}

function readEventsFromLocalStorage() {

    function parseDate(k: string, v: string) {
    if ((k === "start" || k === "end" )) {
      
      return new Date(v);
    }
    return v;
  }
    const storedEvents = localStorage.getItem('events');

    if( storedEvents !== null ) {
      let parsedEvents = JSON.parse(storedEvents, parseDate);

      console.log(parsedEvents);
      return storedEvents ? parsedEvents : [];
    }
    
}
