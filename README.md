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

1. When updating the to-do item status, I tried to change the status only. I thought I could use JS click function with this. but in React, It was much easier to grab the item's id and update the object.
2. When I add the event on the big calendar, the data type is Date object. I needed to save these dates in the local storage to display the calendar with old events. And Localstorage saves the string type data only so I had to convert it to a string type with an event's title and an event's unique ID. But in order to display the added events in React Big calendar, data type has to be Data object. So this data which is saved in local storage should be converted back to Date Object.
3. I wanted to customize the event pop-up modal to save the events in local storage. For the styling, at first, I was struggling to send the status to the parent component and share it with other components too by using component prop. Then I realised react useContext is better here. So once I wrap components that need the modal open/close status, I can use the current modal status and the same function in different components to close the popup and change the modal status.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
