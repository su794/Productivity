# Overview

<img width="628" alt="Screen Shot 2024-11-02 at 4 19 41 PM" src="https://github.com/user-attachments/assets/34dcc164-333b-4fe1-bf02-37ac393bd178">

This Productivity project has both a to-do list and a calendar. I usually use a to-do list for weekly recurring errands and a calendar for an event on a specific date. So this productivity project has two features in one project.

- Add and Delete my to-do items. (If the input field is blank, the item add button is not disabled.)
- Items are saved in local storage. So as long as the same browser is used, items are not gone when closed.
- You can filter to-do items by 'All', 'Active', and 'Complete' filters.
- There is a dark mode toggle on the top right corner for accessibility.
- A calendar shows the events on specific dates under the to-do list. When the date is clicked, the pop-up will appear to add the event title.

Tools: ReactJS, React Big Calendar, React CSS Module.

## Hurdle and Solution

1. When updating the to-do item status, I tried to change the status only. I thought I could use JS click function with this. but in React, It was much easier to grab the item's ID and update the object.
2. React Big Calendar requires 'start' and 'end' to be Date objects, but localStorage can only store strings. When saving, JSON.stringify converts each Date to an ISO string. When loading, a JSON.parse reviver converts them back to Date objects, so previously saved events can be displayed on the calendar
3. I wanted to customize the event pop-up modal to save the events in local storage. For the styling, at first, I was struggling to send the status to the parent component and share it with other components too by using component prop. Then I realised react useContext is better here. So once I wrap components that need the modal open/close status, I can use the current modal status and the same function in different components to close the popup and change the modal status.
