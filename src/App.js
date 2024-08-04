import { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { DarkModeProvider } from './context/DarkModeContext';
import Filters from './components/Filters/Filters';
import Events from './components/Events/Events';

function App() {
  const filters = ['all', 'active', 'completed'];
  const [filter, setFilter] = useState(filters[0]);

  const handleCurrentFilter = (selected) => {
    console.log(selected)
    setFilter(selected);
  }

  return (
    <DarkModeProvider>
      <Filters filters={filters} onFilter={handleCurrentFilter} />
      <TodoList filter={filter} />
      <Events />
    </DarkModeProvider>
  );
}

export default App;
