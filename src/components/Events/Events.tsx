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
import { useModalStatus } from '../../context/useModalStatus';
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
  const { modalStatus, openModal } = useModalStatus();
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(readEventsFromLocalStorage);
  const [startDatePicker, setStartDatePicker] = useState('');
  const [endDatePicker, setEndDatePicker] = useState('');

  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  useEffect( () => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events] )

  const handleSelect = (slotInfo: SlotInfo) => {
    setModalType('add');
    setSelectedEvent(null);
    setStartDatePicker(slotInfo.start.toISOString());
    setEndDatePicker(slotInfo.end.toISOString());
    openModal();
  
  }

  const handleDateClick = (e: CalendarEvent) => {
    setModalType('edit');
    setStartDatePicker(e.start.toISOString());
    
    console.log(e);
    console.log(events);
    setSelectedEvent(e);
    openModal();
  };

  const onAdd = (eModal: CalendarEvent) => { 
    setEvents((prev) => [...prev, eModal]);
  }

  const onEdit = (id: string, newTitle: string) => {
    setEvents( (prev) => prev.map(e => e.id === id ? { ...e, title: newTitle } : e) )
  }

  const onDelete = (id: string) => {
    console.log(id);
    setEvents( (prev) => prev.filter(e => e.id !== id))
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
            events={events} 
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
            onSelectSlot={handleSelect}
            onSelectEvent={handleDateClick}
            date={date}
            onNavigate={setDate}
        />
        {
          modalStatus &&
          <EventModal
            modalType={modalType}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            start={startDatePicker}
            end={endDatePicker}
            event={selectedEvent}
          />
        }
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
