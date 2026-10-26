import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/nunito/latin-400.css';
import '@fontsource/nunito/latin-600.css';
import '@fontsource/nunito/latin-700.css';
import '@fontsource/nunito/latin-800.css';
import '@fontsource/nunito/latin-900.css';
import App from './App.jsx';
import './styles.css';
import './concept.css';
import './motion.css';
import './about.css';
import './catalogue.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
