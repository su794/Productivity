import { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { DarkModeProvider } from './context/DarkModeContext';
import Filters from './components/Filters/Filters';
import Events from './components/Events/Events';
import { ModalStatusProvider } from './context/ModalStatusContext';

function App() {
  const filters = ['all', 'active', 'complete'];
  const [filter, setFilter] = useState(filters[0]);

  const handleCurrentFilter = (selected) => {
    console.log(selected)
    setFilter(selected);
  }

  return (
    <DarkModeProvider>
      <ModalStatusProvider>
        <div className="weekly-wrapper">
          <Filters filters={filters} onFilter={handleCurrentFilter} />
          <TodoList filter={filter} />
        </div>
        <Events />
      </ModalStatusProvider>
    </DarkModeProvider>
  );
}

export default App;
