import React, { useContext, useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import EventModal from '../EventModal/EventModal';
import styles from './Events.module.css';
import { useModalStatus } from '../../context/ModalStatusContext';

const locales = {
    "en-US": require("date-fns/locale/en-US")
  }
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
  });
  
export default function Events() {
  const { modalStatus, toggleModalStatus } = useModalStatus();
  const [events, setEvents] = useState(() => readEventsFromLocalStorage());

  const [text, setText] = useState('');
  const [startDate, setStartDate] = useState( null );
  const [startDatePicker, setStartDatePicker] = useState('');
  const [endDatePicker, setEndDatePicker] = useState('');

  //const [modalStatus, setModalStatus] = useState('modal-close');
  const [modalType, setModalType] = useState('');

  useEffect( () => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events] )

  const [newEvent, setNewEvent] = useState({id: uuidv4(), title: "", start: "", end: ""});

  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  function handleAddEvent() {
    if(text.trim().length === 0) {
      
      return;
    }
    setEvents([...events, newEvent]);

    localStorage.setItem('events', JSON.stringify(newEvent));
    setText('');
    setStartDatePicker('');
    setEndDatePicker('');
  }

  const handleSelect = ({start, end}) => {
    //setModalStatus('modal-open');
    setModalType('add');
  
    setStartDatePicker(start);
    setEndDatePicker(end);
    console.log(start, end);
    toggleModalStatus();
  }

  const handleDateClick = (e) => {
    //setModalStatus('modal-open');
    setModalType('edit');
    setStartDatePicker(e.start);
    console.log(e);
  };

  //const handleModalClose = (status) => setModalStatus(status);
  const handleModalConfirm = (eModal) => { 
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
          //modalStatus={modalStatus.toString()} 
          //onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          start={startDatePicker}
          end={endDatePicker}
        />
    </div>
    
  )
}

function readEventsFromLocalStorage() {

    function parseDate(k, v) {
    if (k === "start" || k === "end" ) {
      
      return new Date(v);
    }
    return v;
  }
    const storedEvents = localStorage.getItem('events');

    let parsedEvents = JSON.parse(storedEvents, parseDate);

    console.log(parsedEvents);
    return storedEvents ? parsedEvents : [];
}
