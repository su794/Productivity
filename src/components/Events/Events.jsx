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

  const [startDate, setStartDate] = useState( null );

  console.log(startDate);

  useEffect( () => {
    localStorage.setItem('events', JSON.stringify(events));
    
  }, [events] )

  const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""});

  function handleAddEvent() {
    setEvents([...events, newEvent]);

    localStorage.setItem('events', JSON.stringify(newEvent));
  }

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
            selected={newEvent.start.toString()}
            onChange={(start) => { 
                setNewEvent({...newEvent, start}) 
                setStartDate(start);
              } 
            }
            />
            <DatePicker 
            placeholderText="End Date"
            minDate={startDate}
            selected={newEvent.end.toString()}
            onChange={(end) => {
                end.setUTCHours(23,59,59,999);
                setNewEvent({...newEvent, end}) 
              }
            }
            />
            <button
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

        <ul>
        {
          
          events.map( (eventTodo, i) => <li key={i}>{ eventTodo.start ? eventTodo.start.toString() : 'no-start'} { eventTodo.end ? eventTodo.end.toString() : 'no-end'}</li> )
          
        }
        </ul>
        

    </>
    
  )
}

function readEventsFromLocalStorage() {

    function parseDate(k, v) {
    if (k === "start" || k === "end" ) {
      
      return new Date(v);
    } 
    // else if( k === "end" ) {
    //     // get indexof 'T' to replace time(hours);
    //     const getIndexOfT = v.indexOf('T');

    //     // Replace '07' to '23'
    //     let newEventEndDate = `${v.substring(0,getIndexOfT+1)}23${v.substring(getIndexOfT+3)}`;
        
    //     return new Date(newEventEndDate);
      
    // }
    return v;
  }
    const storedEvents = localStorage.getItem('events');

    let parsedEvents = JSON.parse(storedEvents, parseDate);

    return storedEvents ? parsedEvents : [];
}
