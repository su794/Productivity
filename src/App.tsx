import { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { DarkModeProvider } from './context/DarkModeContext';
import Filters from './components/Filters/Filters';
import Events from './components/Events/Events';
import { ModalStatusProvider } from './context/ModalStatusContext';
import { FilterTabs } from './types/filter';
import type { Filter } from './types/filter';

function App() {
  //const filters = ['all', 'active', 'completed']; remove this after type replaces
  const [filter, setFilter] = useState<Filter>('all');

  const handleCurrentFilter = (selected: Filter) => {
    console.log(selected);
    setFilter(selected);
  }

  return (
    <DarkModeProvider>
      <ModalStatusProvider>
        <div className="weekly-wrapper">
          <Filters filters={FilterTabs} onFilter={handleCurrentFilter} />
          <TodoList filter={filter} />
        </div>
        <Events />
      </ModalStatusProvider>
    </DarkModeProvider>
  );
}

export default App;
