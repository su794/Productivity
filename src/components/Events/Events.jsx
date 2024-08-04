import React, { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  useEffect( () => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events] )

  const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""});
  //const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setEvents([...events, newEvent]);

    //localStorage.setItem('events', JSON.stringify(newEvent));
  }
  const handleCreateEvent = () => {}

  console.log(events);

  return (
    <>
        <h2>Add new Event</h2>
        <div>
            <input 
            type="text" 
            placeholder='Add Title' 
            style={{ width: "20%", marginRight: "10px" }}
            value={newEvent.title}
            onChange={ (e) => setNewEvent({...newEvent, title: e.target.value})}
            />
            <DatePicker 
            placeholderText="Start Date"
            style={{ marginRight: "10px" }}
            selected={newEvent.start}
            onChange={(start) => setNewEvent({...newEvent, start})}
            />
            <DatePicker 
            placeholderText="End Date"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({...newEvent, end})}
            />
            <button
            style={{marginTop: "10px"}}
            onClick={handleAddEvent}
            >
            Add event
            </button>
        </div>
        <Calendar 
            localizer={localizer} 
            events={events} 
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700, margin: "50px" }}
        />
    </>
    
  )
}

function readEventsFromLocalStorage() {
    const storedEvents = localStorage.getItem('events');

    let parsedEvents = JSON.parse(storedEvents);
    return storedEvents ? [] : [];
}
