import { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer, type SlotInfo } from 'react-big-calendar';
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
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
  const [events, setEvents] = useState<CalendarEvent[]>(readEventsFromLocalStorage);

  const [startDatePicker, setStartDatePicker] = useState('');
  const [endDatePicker, setEndDatePicker] = useState('');

  const [modalType, setModalType] = useState('');

  useEffect( () => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events] )

  const handleSelect = (slotInfo: SlotInfo) => {
    setModalType('add');
  
    setStartDatePicker(slotInfo.start.toISOString());
    setEndDatePicker(slotInfo.end.toISOString());
    toggleModalStatus();
  }

  const handleDateClick = (e: CalendarEvent) => {
    setModalType('edit');
    setStartDatePicker(e.start.toISOString());
  };

  const handleModalConfirm = (eModal: CalendarEvent) => { 
    setEvents((prev) => [...prev, eModal]);
  }
  return (
    <div className={styles.calendar}>
        <h2>Calendar</h2>
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
            onSelectEvent={handleDateClick}
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

function readEventsFromLocalStorage(): CalendarEvent[] {
  const storedEvents = localStorage.getItem('events');
  if ( storedEvents === null ) return [];

  try {
    const parsed = JSON.parse(storedEvents, (key, value) =>
     key === 'start' || key === 'end' ? new Date(value) : value
    );
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
    
}
