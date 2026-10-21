import React, { useContext, useState } from 'react';
import styles from './Filters.module.css';
import type { IconType } from 'react-icons';
import { FaMoon } from 'react-icons/fa';
import { IoSunny } from "react-icons/io5";
import { DarkModeContext, useDarkMode } from '../../context/DarkModeContext';
import Button from '../Button/Button';
import { FilterTabs } from '../../types/filter';
import type { Filter } from '../../types/filter';

type FilterProps = {
  filters: typeof FilterTabs;
  onFilter: (filter: Filter) => void;
}

export default function Filters( { filters, onFilter }: FilterProps ) {
    const [currentFilter, setCurrentFilter] = useState('all');
    const handleFilter = (e: MouseEvent) => {
        e.preventDefault();
        onFilter('active');
    }

    const { darkMode, toggleDarkMode } = useDarkMode();
    const [btnClassName, setBtnClassName] = useState('');

    const toggleClass = (filter: Filter) => {
      setCurrentFilter(filter);
    }
  return (
    <>
      <div className={styles.themeToggle}>
        <Button text={ darkMode ? <IoSunny /> : <FaMoon /> } onClick={() => toggleDarkMode()} />
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
