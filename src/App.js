import { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { DarkModeProvider } from './context/DarkModeContext';
import Filters from './components/Filters/Filters';
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

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date( 2024, 7, 0),
    end: new Date( 2024, 7, 0)
  },
  {
    title: "Vacation",
    start: new Date(2024, 7, 7),
    end: new Date(2024, 7, 8)
  },
  {
    title: "Conference",
    start: new Date(2024, 7, 20),
    end: new Date(2024, 7, 20)
  }
]

function App() {
  const filters = ['all', 'active', 'completed'];
  const [filter, setFilter] = useState(filters[0]);

  const handleCurrentFilter = (selected) => {
    console.log(selected)
    setFilter(selected);
  }

  const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""});
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <DarkModeProvider>
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
        events={allEvents} 
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700, margin: "50px" }}
      /> 
      <Filters filters={filters} onFilter={handleCurrentFilter} />
      <TodoList filter={filter} />
    </DarkModeProvider>
  );
}

export default App;
