import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './assets/styles/styles.css';

// Encuentra el elemento "root" en el DOM
const rootElement = document.getElementById('root');

// Crear un "root" para renderizar la aplicación
const root = createRoot(rootElement);

// Renderiza la aplicación en el "root"
root.render(<App />);