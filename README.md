# Overview

<img width="628" alt="Screen Shot 2024-11-02 at 4 19 41 PM" src="https://github.com/user-attachments/assets/34dcc164-333b-4fe1-bf02-37ac393bd178">

This Productivity project has both a to-do list and a calendar. I usually use a to-do list for weekly recurring errands and a calendar for an event on a specific date. So this productivity project has two features in one project.

- Add and Delete my to-do items.
- Items are saved in local storage. So as long as the same browser is used, items are not gone when closed.
- You can filter to-do items by 'All', 'Active', and 'Completed' filters.
- There is a dark mode toggle on the top right corner for accessibility.
- A calendar shows the events on specific dates under the to-do list. When the date is clicked, the pop-up will appear to add the event title.


## Tech Stack

React, TypeScript, Vite, React Big Calendar, CSS Modules, npm

## Hurdle and Solution

1. When updating the to-do item status, I tried to change the status only. I thought I could use JS click function with this. but in React, It was much easier to grab the item's ID and update the object.
2. React Big Calendar requires `start` and `end` to be Date objects, but localStorage can only store strings. I convert them to ISO strings with `JSON.stringify` when saving and back to `Date` objects with a `JSON.parse` reviver when loading.
3. I wanted to customize the event pop-up modal to save the events in local storage. For the styling, at first, I was struggling to send the status to the parent component and share it with other components too by using a component prop. Then I realised React useContext is better here. So once I wrap components that need the modal open/close status, I can use the current modal status and the same function in different components to close the popup and change the modal status.

## Why TypeScript?

I started this project in JavaScript and migrated it to TypeScript. When I work alone, I remember what every variable and parameter is. On a team, that knowledge isn't always shared, and I often have to read code I didn't write (or wrote a long time ago). 
Types document the intent of the code and catch mistakes before runtime, which matters more as a project and the number of contributors grow.

### What I learned

- **Return types catch silent bugs.** My `readEventsFromLocalStorage` function returned `undefined` when no events were saved, causing the calendar to crash. Declaring the return type as `CalendarEvent[]` makes TypeScript flag this kind of mistake immediately.
- **Dates don't survive localStorage.** `Date` objects become strings when saved. I restore them with a `JSON.parse` reviver and keep stored vs. displayed event types separate, so the compiler tells me when I forget to convert between them.
- **Defensive parsing.** I handle a missing value, corrupted JSON (`try/catch`), and unexpected shapes (`Array.isArray`) separately.
- **Typing React Context safely.** I used `createContext<T | undefined>(undefined)` with a custom hook (`useModalStatus`, `useDarkMode`) that throws if it's used outside its Provider. This turns a silent bug into a clear error message.
- **Fixing patterns ESLint flagged.** I had been calling `setState` inside `useEffect` to read the saved theme from localStorage. I replaced it with a lazy initializer in `useState`, which removed an extra render.

## Why Vite and npm?

I started with Create React App and Yarn. Yarn gave me installation errors, and CRA is no longer maintained. It couldn't install the latest TypeScript, which I needed to type a React icon component passed as a prop. 
I migrated to Vite with npm, which supports current TypeScript out of the box and keeps setup simple with a single `package-lock.json`.


## Getting Started

```bash
git clone https://github.com/su794/Productivity.git
cd Productivity
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint |
