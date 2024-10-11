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
    const [btnClassName, setBtnClassName] = useState('');

    const toggleClass = (filter) => {
      setCurrentFilter(filter);
    }
  return (
    <>
      <div className={styles.themeToggle}>
        <button onClick={() => toggleDarkMode()}>
          { darkMode ? <IoSunny /> : <FaMoon /> }
        </button>
      </div>
      <header>
      <h1 className={styles.heading}>Weekly Todo List</h1>
      <ul className={styles.filters}>
        {
            filters.map( filter => 
              {
                return <li 
                        className={`${styles.filter} ${filter == currentFilter ? 'active' : ''} `} 
                        key={filter}
                        >
                          <button
                            
                            onClick={ 
                              () => { 
                                toggleClass(filter);
                                onFilter(filter); 
                              }
                            }
                          >
                            {filter}
                          </button>
                        </li> 
              } )
        }
      </ul>
    </header>
    </>
  )
}
