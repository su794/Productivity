import React, { useContext, useState } from 'react';
import styles from './Filters.module.css';
import { FaMoon } from 'react-icons/fa';
import { IoSunny } from "react-icons/io5";
import { DarkModeContext, useDarkMode } from '../../context/DarkModeContext';

export default function Filters( { filters, onFilter } ) {
    const [currentFilter, setCurrentFilter] = useState(filters[0]);
    const handleFilter = (e) => {
        e.preventDefault();
        onFilter('active');
    }

    const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <header>
      <h2>Weekly Todo List</h2>
      <div>
        <button onClick={() => toggleDarkMode()}>
          { darkMode ? <IoSunny /> : <FaMoon /> }
        </button>
      </div>
      <ul className={styles.filters}>
        {
            filters.map( filter => <li className={styles.filter} key={filter}><button onClick={ () => { onFilter(filter) }}>{filter}</button></li> )
        }
      </ul>
    </header>
  )
}
