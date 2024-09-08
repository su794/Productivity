import React, { useEffect, useState } from 'react'
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

  const [events, setEvents] = useState(() => readEventsFromLocalStorage());

  const [text, setText] = useState('');
  const [startDate, setStartDate] = useState( null );
  const [startDatePicker, setStartDatePicker] = useState('');
  const [endDatePicker, setEndDatePicker] = useState('');

  const [modalStatus, setModalStatus] = useState('modal-close');

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
    setModalStatus('modal-open');
    //const title = window.prompt("New Event Name");
    
    if( text.trim().length === 0 ) {
      alert('Please add the event title');
      return;
    
    }

    // setNewEvent({title, start: start.toString(), end: end.toString()});
    setEvents([...events, {title: text, start, end}]);

    localStorage.setItem('events', JSON.stringify(newEvent));

    setText('');
    
  }
  return (
    <>
        <h2>Add new Event</h2>
        <div>
            <input
              type="text" 
              placeholder='Add Title' 
              style={{ width: "20%", marginRight: "10px" }}
              value={text}
              onChange={handleTextChange}
            />
            <DatePicker 
            placeholderText="Start Date"
            style={{ marginRight: "10px" }}
            selected={newEvent.start.toString()}
            onChange={(start) => { 
                setNewEvent({...newEvent, title: text, start}) 
                setStartDate(start);
                setStartDatePicker(start.toLocaleDateString());
              } 
            }
            value={startDatePicker}
            />
            <DatePicker 
            placeholderText="End Date"
            minDate={startDate}
            selected={newEvent.end.toString()}
            onChange={(end) => {
                end.setUTCHours(23,59,59,999);
                setNewEvent({...newEvent, title: text, end});
                setEndDatePicker(end.toLocaleDateString() );
              }
            }
            value={endDatePicker}
            />
            {/* <button
              onClick={handleAddEvent}
            >
            Add event
            </button> */}
        </div>
        <Calendar
            views={["month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            events={events} 
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700, margin: "50px" }}
            onSelectSlot={handleSelect}
        />
        <EventModal modalStatus={modalStatus} />
        
    </>
    
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
