import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App.js'; // Import the App component
import './styles.css';

// Find the root element
const rootElement = document.getElementById('root');

// Create a root
const root = createRoot(rootElement);

// Render the App component
root.render(<App />);


// import React from 'react';
// import ReactDOM from 'react-dom';
// import TestRouter from './testRouter.js';

// ReactDOM.render(<TestRouter />, document.getElementById('root'));